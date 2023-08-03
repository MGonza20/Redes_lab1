


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
export const encodeWithHaamming = (frame: string) => {
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
	return response.join('');
}

console.log(encodeWithHaamming('1101'));