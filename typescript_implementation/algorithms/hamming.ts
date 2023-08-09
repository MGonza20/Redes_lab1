import { Result } from './../utils';

import chalk from 'chalk';
import prompt from 'prompt-sync';
/**
 * Cheks if a number is power of two
 * @param num Number to check if is power of two
 * @returns 
 */
const isPowerOfTwo = (num: number) => {
  return (num & (num - 1)) === 0 && num !== 0;
}
/**
 * Encodes a frame with hamming code
 * @param n Length of the frame
 * @param frame Frame to send
 */
export const encodeWithHaamming = (frame: string): Result<[string, number[]]> => {
	let r = 0;
	let m = frame.length;
	let response: number[] = [];
	// Calculando el numero de bits redundantes
	for (let i = 0; i < m; i++) {
		// 2^r >= m + r + 1
		if (Math.pow(2, i) >= m + i + 1) {
			r = i;
			break;
		}
	}
	// Insertando bits de paridad
	let j = 0;
	for (let i = 0; i < m + r; i++) {
		if (isPowerOfTwo(i + 1)) {
			response.push(0);
		} else {
			response.push(parseInt(frame.charAt(j)));
			j += 1;
		}
	}

	// Calcular bits de paridad
	let parityBits = new Array(r);
	for (let i = 1; i <= r; i++) {
		let parityCount = 0;
		for (let j = 0; j < response.length; j++) {
			if (response[j] === 1 && (j + 1) & (2 ** (i - 1))) {
				parityCount += 1;
			}
		}
		parityBits[i - 1] = (parityCount % 2 === 0) ? 0 : 1;
	}
	
	// Insertando bits de paridad
	for (let i = 0; i < r; i++) {
		response[(2 ** i) - 1] = parityBits[i];
	}	
	return Result.ok([response.join(''), parityBits]);
}


/**
 * Decode a frame with hamming code
 * @param frame Frame to decode
 */
export const decodeWithHamming = (frame: string): Result<String> => {
	const n = frame.length;
	let r = 0;
	// Calculando el numero de bits redundantes y bits con data
	for (let i = 0; i < n; i++) {
		// 2^r >= m + r + 1
		if (Math.pow(2, i) >= n + 1) {
			r = i;
			break;
		}
	}
	let receivedParityBits = new Array(r);
	let incomingFrame: string = '';
	let k = 0
	for (let i = 0; i < n; i++) {
		if (isPowerOfTwo(i + 1)) {
			receivedParityBits[k] = parseInt(frame.charAt(i));
			k += 1;
		} else {
			incomingFrame += frame.charAt(i);
		}
	}
	// Identificar posible error 
	const encodingResult = encodeWithHaamming(incomingFrame);
	let parityBits: number[];
	if (!encodingResult.isSuccess) {
		return Result.fail(encodingResult.error ?? '');
	} else {
		parityBits = encodingResult.value![1];
	}
	let syndrome = [];
	for (let i = r - 1; i >= 0; i--) {
		syndrome.push(receivedParityBits[i] !== parityBits[i] ? 1 : 0);
	}
	
	if (parseInt(syndrome.join('')) === 0 ) {
		return Result.ok(incomingFrame);
	} else {
		// Corregir la trama (solo funciona si hay un error)
		let errorPosition = parseInt(syndrome.join(''), 2);
		let error = 'ERROR EN POSICION: ' + errorPosition;
		let correctFrame = frame.split('');
		correctFrame[errorPosition - 1] = correctFrame[errorPosition - 1] === '0' ? '1' : '0';
		error += '\nTRAMA CORREGIDA: ' + correctFrame.join('');
		return Result.fail(error);
	}
}

// Ejemplo de uso
console.log(encodeWithHaamming('1010101'));
var n = prompt()('Ingrese frame para realizar decoding: ');
decodeWithHamming(n);