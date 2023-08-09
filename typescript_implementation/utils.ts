

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