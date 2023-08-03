
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
    return expectedChecksum == checksum



checksum = fletcher(binaryStringToByteArray('0101001'), 32)
answer = "Si" if decodeFletcher('0101001' + checksum, 16) else "No"

print(f"Fletcher-16 Checksum: {checksum}")
print(f"Codigo valido {answer}")

