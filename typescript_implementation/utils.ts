

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