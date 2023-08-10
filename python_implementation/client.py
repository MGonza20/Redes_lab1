from utils import ascii_to_binary_string, add_noise_to_frame
from algorithms.hamming import hamming_encode
import socketio
import colored  


n = input(colored.fg("yellow") + "Ingrese frame para realizar decoding: " + colored.attr("reset"))
socket = socketio.Client()

@socket.on('connect')
def on_connect():
    print(colored.fg("green") + "Conectado al servidor" + colored.attr("reset"))
    
    # ----- Presentacion ----- #
    frame = ascii_to_binary_string(n)
    # ----- Enlace ----- #
    encoded_frame = hamming_encode(frame)[0]  
    # ----- Ruido ----- #
    encoded_frame = add_noise_to_frame(encoded_frame, 1/100)
    # ----- Transmision ----- #
    socket.emit('frame', encoded_frame)
    print("Trama enviada:", encoded_frame)

socket.connect('http://localhost:3003')
