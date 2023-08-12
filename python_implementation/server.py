from flask import Flask
from flask_socketio import SocketIO
from algorithms.hamming import hamming_check
from algorithms.checksum import decodeFletcher
from utils import binary_string_to_ascii
import colored


PORT = 3000
HOST = '127.0.0.1'

algo = input(colored.fg("yellow") + 'Ingrese el algoritmo a utilizar (hamming/fletcher): ' + colored.attr("reset"))
if algo not in ['hamming', 'fletcher']:
    print('Opcion incorrecta')

else:
    app = Flask(__name__)
    socket = SocketIO(app)

    @socket.on('frame')
    def handle_frame(frame):
        print('Trama recibida:', frame)

        if algo == 'hamming':
            decodingResult = hamming_check(frame)
            if 'success' in decodingResult:
                message = binary_string_to_ascii(decodingResult['success'])
                print('Mensaje recibido: ' + colored.fg('cyan') + message + colored.attr('reset'))
            else:
                print("\033[31mError: No se logro hacer encoding.\033[31m")
                print(colored.fg('red') + 'Cadena con error: ' + colored.attr('reset') + decodingResult['error'][0])

        elif algo == 'fletcher':
            decodingResult = decodeFletcher(frame)
            if decodingResult[0] == True:
                print('Hubieron errores en el envio')
            else:
                print('No hubieron errores en el envio')

    if __name__ == '__main__':
        print(f'Listening on port {PORT} \n')
        socket.run(app, host=HOST, port=PORT)
