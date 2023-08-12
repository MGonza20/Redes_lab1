from utils import ascii_to_binary_string, add_noise_to_frame
from algorithms.hamming import hamming_encode
from algorithms.checksum import fletcher, binaryStringToByteArray
import socketio
import colored  


print("\nOpciones\n1. Enviar mensaje con hamming\n2. Enviar mensaje con flecher.\n")
selection = input(colored.fg("yellow") + "Ingresa una opcion de envio: " + colored.attr("reset"))

if selection not in ['1', '2']:
    print('Opcion incorrecta')

else:
    n = input(colored.fg("yellow") + "Ingrese frame para realizar decoding: " + colored.attr("reset"))
    socket = socketio.Client()

    @socket.on('connect')
    def on_connect():
        print(colored.fg("green") + "Conectado al servidor" + colored.attr("reset"))
        
        # ----- Presentacion ----- #
        frame = ascii_to_binary_string(n)
        # ----- Enlace ----- #
        if selection == '1':
            encoded_frame = hamming_encode(frame)[0]  
        else:
            encoded_frame = fletcher(binaryStringToByteArray(frame))
        # ----- Ruido ----- #
        encoded_frame = add_noise_to_frame(encoded_frame, 1/100)
        # ----- Transmision ----- #
        socket.emit('frame', encoded_frame)
        print("Trama enviada:", encoded_frame)

    socket.connect('http://localhost:3000')

