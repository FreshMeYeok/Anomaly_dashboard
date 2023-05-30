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
# from load_model import load_model



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
        print("anomaly_probabilities 계산 중")
        anomaly_probabilities = load_model.cal_anomaly_probability(filename)
        print("anomaly_probabilities 계산 완료")
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
