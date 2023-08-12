
def fletcher(data = [], k=16):

    sum1 = 0
    sum2 = 0
    mod = 255

    if k == 16:
        mod = 255
    elif k == 32:
        mod = 65535
    elif k == 64:
        mod = 4294967295

    for i in range(len(data)):
        sum1 = (sum1 + data[i]) % mod
        sum2 = (sum2 + sum1) % mod

    checksum = (sum2 << 8) | sum1
    return bin(checksum)[2:].zfill(k)


def binaryStringToByteArray(binaryString):
    byteArray = []
    for i in range(0, len(binaryString), 8):
        byteArray.append(int(binaryString[i:i+8], 2))
    return byteArray

def decodeFletcher(content, k=16):
    checksum = content[-k:]
    frame = content[:-k]
    data = binaryStringToByteArray(frame)
    expectedChecksum = fletcher(data, k)
    return [expectedChecksum == checksum, data]



def interface():
    c_bits = input("\nIngresa la cadena de bits: ")
    bits_q = int(input("Ingresa la cantidad de bits (8, 16, 32, 64): "))
    checksum = "" 

    if c_bits == "":
        print("Cadena de bits vacia")
        return
    if bits_q not in [8, 16, 32, 64]:
        print("Cantidad de bits no valida")
        return

    if bits_q == 8:
        checksum = fletcher(binaryStringToByteArray(c_bits), 8)
        frame = f"Fletcher-8 Checksum: {checksum}"
    elif bits_q == 16:
        checksum = fletcher(binaryStringToByteArray(c_bits), 16)
        frame = f"Fletcher-16 Checksum: {checksum}"
    elif bits_q == 32:
        checksum = fletcher(binaryStringToByteArray(c_bits), 32)
        frame = f"Fletcher-32 Checksum: {checksum}"
    elif bits_q == 64:
        checksum = fletcher(binaryStringToByteArray(c_bits), 64)
        frame = f"Fletcher-64 Checksum: {checksum}"

    if checksum == "": return
    answer = "Si" if decodeFletcher(c_bits + checksum, bits_q) else "No"
    if answer == "No": 
        print(f"\nErrores detectados. Se descarta la trama.")
    else:
        print(f"\nNo se detectaron errores.\n{frame}")

if __name__ == "__main__":
    interface()