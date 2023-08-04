"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeWithHaamming = void 0;
/**
 * Cheks if a number is power of two
 * @param num Number to check if is power of two
 * @returns
 */
var isPowerOfTwo = function (num) {
    return (num & (num - 1)) === 0 && num !== 0;
};
/**
 * Encodes a frame with hamming code
 * @param n Length of the frame
 * @param frame Frame to send
 */
var encodeWithHaamming = function (frame) {
    var r = 0;
    var m = frame.length;
    var response = [];
    // Calculando el numero de bits redundantes
    for (var i = 0; i < m; i++) {
        // 2^r >= m + r + 1
        if (Math.pow(2, i) >= m + i + 1) {
            r = i;
            break;
        }
    }
    // Insertando bits de paridad
    var j = 0;
    for (var i = 0; i < m + r; i++) {
        if (isPowerOfTwo(i + 1)) {
            response.push(0);
        }
        else {
            response.push(parseInt(frame.charAt(j)));
            j += 1;
        }
    }
    // Calcular bits de paridad
    var parityBits = new Array(r);
    for (var i = 1; i <= r; i++) {
        var parityCount = 0;
        for (var j_1 = 0; j_1 < response.length; j_1++) {
            if (response[j_1] === 1 && (j_1 + 1) & (Math.pow(2, (i - 1)))) {
                parityCount += 1;
            }
        }
        parityBits[i - 1] = (parityCount % 2 === 0) ? 0 : 1;
    }
    // Insertando bits de paridad
    for (var i = 0; i < r; i++) {
        response[(Math.pow(2, i)) - 1] = parityBits[i];
    }
    return [response.join(''), parityBits];
};
exports.encodeWithHaamming = encodeWithHaamming;
/**
 * Decode a frame with hamming code
 * @param frame Frame to decode
 */
var decodeWithHamming = function (frame) {
    var n = frame.length;
    var r = 0;
    // Calculando el numero de bits redundantes y bits con data
    for (var i = 0; i < n; i++) {
        // 2^r >= m + r + 1
        if (Math.pow(2, i) >= n + 1) {
            r = i;
            break;
        }
    }
    var receivedParityBits = new Array(r);
    var incomingFrame = '';
    var k = 0;
    for (var i = 0; i < n; i++) {
        if (isPowerOfTwo(i + 1)) {
            receivedParityBits[k] = parseInt(frame.charAt(i));
            k += 1;
        }
        else {
            incomingFrame += frame.charAt(i);
        }
    }
    console.log('Parity bits recibidos: ', receivedParityBits);
    console.log('Data incoming: ', incomingFrame);
    var parityBits = (0, exports.encodeWithHaamming)(incomingFrame)[1];
    var syndrome = [];
    console.log('Parity bits calculados: ', parityBits);
    for (var i = r - 1; i >= 0; i--) {
        syndrome.push(receivedParityBits[i] !== parityBits[i] ? 1 : 0);
    }
    if (parseInt(syndrome.join('')) === 0) {
        console.log('CODIGO CORRECTO');
    }
    else {
        var errorPosition = parseInt(syndrome.join(''), 2);
        console.log('ERROR EN POSICION: ' + errorPosition);
        var correctFrame = frame.split('');
        correctFrame[errorPosition - 1] = correctFrame[errorPosition - 1] === '0' ? '1' : '0';
        console.log('FRAME CORREGIDO: ' + correctFrame.join(''));
    }
};
console.log((0, exports.encodeWithHaamming)('0101001'));
decodeWithHamming('10001011000');
