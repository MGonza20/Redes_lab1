from flask import Flask
from flask_socketio import SocketIO
from algorithms.hamming import hamming_check
from utils import binary_string_to_ascii

PORT = 3000
HOST = '127.0.0.1'

app = Flask(__name__)
socket = SocketIO(app)

@socket.on('frame')
def handle_frame(frame):
    print('Trama recibida:', frame)
    decodingResult = hamming_check(frame)
    if 'success' in decodingResult:
        message = binary_string_to_ascii(decodingResult['success'])
        print("\033[92m" + 'Mensaje recibido:', message + "\033[0m")
    else:
        print("\033[91m" + decodingResult + "\033[0m")

if __name__ == '__main__':
    print(f'Listening on port {PORT} \n')
    socket.run(app, host=HOST, port=PORT)
