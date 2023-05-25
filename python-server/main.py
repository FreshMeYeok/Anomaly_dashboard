from flask import Flask
from flask_socketio import SocketIO
import random
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# 클라이언트가 연결되었을 때 실행되는 이벤트 핸들러


@socketio.on('connect')
def handle_connect():
    print('클라이언트가 연결되었습니다!')

# 매 초마다 랜덤한 숫자를 보내는 함수


# @socketio.on('connect')
def send_random_number():
    while True:
        number = random.randint(1, 100)  # 1부터 100까지의 랜덤한 숫자 생성
        # 클라이언트에게 'random_number' 이벤트와 함께 숫자 전송

        """Model 삽입
        h x w x c
        model.predict(data = images)
        
        
        
        """

        print(number)
        socketio.emit('random_number', number)
        socketio.sleep(1)  # 1초 대기

# Flask 애플리케이션 실행 시 스레드를 시작하는 함수


def start_thread():
    socketio.start_background_task(send_random_number)


if __name__ == '__main__':
    print("실행")
    start_thread()
    socketio.run(app, host='0.0.0.0', port=8888)
