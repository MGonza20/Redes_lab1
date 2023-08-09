

/**
 * Converts an ASCII string to a binary string
 * @param {string} asciiString 
 * @returns {string}
 */
export const asciiToBinaryString = (asciiString: string): string => {
	let binaryString = '';
	for (let i = 0; i < asciiString.length; i++) {
		let word = '';
		word += asciiString.charCodeAt(i).toString(2);
		// Add leading zeros
		while (word.length < 8) {
			word = '0' + word;
		}
		binaryString += word;
	}
	return binaryString;
}

/**
 * Convert a binary string to its ascii representation.
 * @param {string} binaryString 
 * @returns {string}
 */
export const binaryStringToAscii = (binaryString: string): string => {
	let asciiString = '';
	for (let i = 0; i < binaryString.length; i += 8) {
		let word = binaryString.slice(i, i + 8);
		asciiString += String.fromCharCode(parseInt(word, 2));
	}
	return asciiString;
}

/**
 * Add noise to a frame
 * @param {string} frame 
 * @param {number} probability 
 * @returns 
 */
export const addNoiseToFrame = (frame: string, probability: number): string => {
	let newFrame = '';
	for (let i = 0; i < frame.length; i++) {
		let bit = frame.charAt(i);
		if (Math.random() < probability) {
			console.log('noise!')
			bit = (bit === '1') ? '0' : '1';
		}
		newFrame += bit;
	}
	return newFrame;
}

/**
 * Result class
 */
export class Result<T> {
	public value?: T;
	public isSuccess: boolean;
	public error?: string;

	constructor(isSuccess: boolean, value?: T, error?: string) { 
		this.isSuccess = isSuccess;
		this.value = value;
		this.error = error;
	}

	/**
	 * Create an ok result
	 * @param value 
	 * @returns 
	 */
	public static ok<U>(value: U): Result<U> {
		return new Result<U>(true, value);
	}

	/**
	 * Create a failed result
	 * @param error 
	 * @returns 
	 */
	public static fail<U>(error: string): Result<U> {
		return new Result<U>(false, undefined, error);
	}

}