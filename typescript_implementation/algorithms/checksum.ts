import chalk from 'chalk';
import prompt from 'prompt-sync';

/**
 * Calculate a fletcher checksum
 * @param data Data to encode
 * @param k Flavor for the fletcher checksum
 * @returns 
 */
const fletcher = (data: number[], k = 16) => {
	
  let sum1 = 0;
	let sum2 = 0;
	
	let mod = 255;
	// Configurando el algoritmo dependiendo de K
	if (k == 16) mod = 255
	else if (k == 32) mod = 65535
	else if (k == 64) mod = 4294967295

  for (let i = 0; i < data.length; i++) {
    sum1 = (sum1 + data[i]) % mod;
		sum2 = (sum2 + sum1) % mod;
  }
	const checksum = (sum2 << 8) | sum1;
	let checksumString = checksum.toString(2).toUpperCase();
	// Agregando ceros a la izquierda
	while ((checksumString.length % k) != 0) {
		checksumString = '0' + checksumString;
	}
  return checksumString;
}

/**
 * Converts a binary string to a byte array
 * @param str 
 * @returns 
 */
const binaryStringToByteArray = (str: string) => {
	const byteArray = [];
	for (let i = 0; i < str.length; i += 8) {
		byteArray.push(parseInt(str.slice(i, i + 8), 2));
	}
	return byteArray;
}


/**
 * Decodes a fletcher code
 * @param content content to decode
 * @param k factor for the fletcher checksum
 * @returns 
 */
const decodeFletcher = (content: string, k = 16) => {
	// checksum is the last k bits
	const checksum = content.slice(content.length - k);
	const frame = content.slice(0, content.length - k);
	const data = binaryStringToByteArray(frame);
	const expectedChecksum = fletcher(data, k);
	return expectedChecksum === checksum;
}

// Ejemplo de uso
const checksum = fletcher(binaryStringToByteArray('1000111'), 16);
console.log("Fletcher-16 Checksum:", checksum);
var n = prompt()('Ingrese frame para realizar decoding: ');
const ok = decodeFletcher(n, 16);
if (ok) {
	console.log(chalk.green('CODIGO CORRECTO'));
} else {
	console.log(chalk.red('CODIGO INCORRECTO'));
}