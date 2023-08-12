from flask import Flask
from flask_socketio import SocketIO
from algorithms.hamming import hamming_check
from utils import binary_string_to_ascii
import colored


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
        print('Mensaje recibido: ' + colored.fg('cyan') + message + colored.attr('reset'))
    else:
        print("\033[31mError: No se logro hacer encoding.\033[31m")
        print(colored.fg('red') + 'Cadena con error: ' + colored.attr('reset') + decodingResult['error'][0])

if __name__ == '__main__':
    print(f'Listening on port {PORT} \n')
    socket.run(app, host=HOST, port=PORT)
