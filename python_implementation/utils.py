
import random

def ascii_to_binary_string(ascii_string):
    return ''.join(format(ord(i), '08b') for i in ascii_string)

def binary_string_to_ascii(binary_string):
    bits_slicing = [binary_string[i:i+8] for i in range(0, len(binary_string), 8)]
    return ''.join(chr(int(bits, 2)) for bits in bits_slicing)

def add_noise_to_frame(frame, probability):
    new_frame = ''
    for i in range(len(frame)):
        bit = frame[i]
        if random.random() < probability: bit = '0' if bit == '1' else '1'
        new_frame += bit
    return new_frame