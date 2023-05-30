from flask import Flask
from flask_socketio import SocketIO
import random
import threading
from flask import Flask, request, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import numpy as np
from flask import jsonify


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')
UPLOAD_FOLDER = "./uploads"  # 동영상 파일을 저장할 폴더 경로
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# 클라이언트가 연결되었을 때 실행되는 이벤트 핸들러


@socketio.on('connect')
def handle_connect():
    print('클라이언트가 연결되었습니다!')


def send_anomaly_probabilities(anomaly_probabilities):
    socketio.emit('anomaly_probabilities', anomaly_probabilities)
    print(anomaly_probabilities)


# 매 초마다 랜덤한 숫자를 보내는 함수
# @socketio.on('connect')
def send_random_number():
    anomaly_value = np.sin(np.arange(100))
    # for i in range(len(anomaly_value)):
    while True:
        number = random.randint(1, 10)  # 1부터 100까지의 랜덤한 숫자 생성
        # 클라이언트에게 'random_number' 이벤트와 함께 숫자 전송

        """Model 삽입
        h x w x c
        model.predict(data = images)
        
        
        
        """
        # number = anomaly_value[i]
        print(number)
        socketio.emit('random_number', number)
        socketio.sleep(0.1)  # 1초 대기

# Flask 애플리케이션 실행 시 스레드를 시작하는 함수


def start_thread():
    socketio.start_background_task(send_random_number)


def anomaly_value():
    anomaly_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return anomaly_value


@app.route("/upload", methods=["POST"])
def upload():
    if "video" in request.files:
        video = request.files["video"]
        filename = secure_filename(video.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        video.save(filepath)

        # 모델을 통과하여 각 초에서의 이상탐지 확률 리스트를 얻어옴
    # anomaly_probabilities = model.predict(video_path)
        anomaly_probabilities = [74, 64, 52, 28, 12, 97, 11, 54, 59, 46, 47, 9, 70, 2, 50, 16, 12, 14, 29, 41, 23, 39, 75, 62, 64, 84, 30, 12, 95, 62, 51, 59, 26, 87, 73, 88, 88, 61, 39, 91, 19, 22, 52, 82, 41, 94, 31,
                                 40, 9, 79, 23, 99, 90, 32, 7, 97, 68, 34, 74, 71, 76, 10, 74, 23, 96, 60, 37, 48, 87, 49, 71, 4, 11, 44, 71, 71, 33, 5, 85, 99, 93, 98, 64, 28, 29, 43, 17, 40, 99, 78, 19, 2, 44, 6, 19, 28, 80, 46, 57, 58]

    # 각 초에서의 이상탐지 확률 리스트를 클라이언트에게 전송
    # for probability in anomaly_probabilities:
    #     print("출력중")
    #     send_anomaly_probabilities(probability)
    #     socketio.sleep(0.1)

        # 업로드한 영상의 URL 생성
        video_url = f"http://localhost:8888/download/{filename}"
        return jsonify({"url": video_url, "anomaly_probabilities": anomaly_probabilities})

    return "No video file provided.", 400


@app.route("/download/<filename>", methods=["GET"])
def download(filename):
    print("전송 시작")
    print("전송 완료")
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename, mimetype='video/mp4')


if __name__ == '__main__':
    print("실행")
    # start_thread()
    socketio.run(app, host='0.0.0.0', port=8888)
