
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

const binaryStringToByteArray = (str: string) => {
	const byteArray = [];
	for (let i = 0; i < str.length; i += 8) {
		byteArray.push(parseInt(str.slice(i, i + 8), 2));
	}
	return byteArray;
}


const decodeFletcher = (content: string, k = 16) => {
	// checksum is the last k bits
	const checksum = content.slice(content.length - k);
	const frame = content.slice(0, content.length - k);
	const data = binaryStringToByteArray(frame);
	const expectedChecksum = fletcher(data, k);
	return expectedChecksum === checksum;
}

// Example usage:
const checksum = fletcher(binaryStringToByteArray('0101001'), 16);
console.log("Fletcher-16 Checksum:", checksum);
console.log("Codigo valido: ", decodeFletcher('0101001' + checksum, 16) ? "Si" : "No");

