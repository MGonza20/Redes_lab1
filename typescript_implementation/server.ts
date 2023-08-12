import chalk from 'chalk';
import express from 'express';
import {Server} from 'socket.io';
import { decodeWithHamming, encodeWithHamming } from './algorithms/hamming';
import { binaryStringToAscii, asciiToBinaryString } from './utils';
import { appendFileSync } from "fs";
import { words } from './words';
import { binaryStringToByteArray, decodeFletcher, fletcher } from './algorithms/checksum';
import prompt from 'prompt-sync';


const app = express();

let algorithm = prompt()('Ingrese el algoritmo a utilizar (hamming/fletcher): ');
let option = 0;	// hamming = 0
if (algorithm === 'hamming') {
	option = 0;
} else if (algorithm === 'fletcher') {
	option = 1;
}


const server = app.listen(3000, () => {
  console.log('Listening at port 3000');
});

const io = new Server(server);


const handleHamming = (frame: string, originalWord: string) => {
		let original = encodeWithHamming(asciiToBinaryString(originalWord)).value![0];
		console.log('original:',original);
		console.log('Trama recibida: ' + frame)
		const decodingResult = decodeWithHamming(frame);
		if (decodingResult.isSuccess) {
			const message = binaryStringToAscii(decodingResult.value!);
			console.log(chalk.green('Mensaje recibido: ' + message));
			const csv = `${original},ok,\n`
			appendFileSync('hamming_results_3.csv', csv);
		} else {
			console.log(chalk.red(decodingResult.error));
			const csv = `${original},fail,${decodingResult.errorValue!.correctedFrame}\n`
			appendFileSync('hamming_results_3.csv', csv);
		}
};

const handleFletcher = (frame: string, originalWord: string) => {
		let original = fletcher(binaryStringToByteArray(asciiToBinaryString(originalWord))).value!;
		const decodingResult = decodeFletcher(frame);
		if (decodingResult.isSuccess) {
			const csv = `${original},ok\n`
			appendFileSync('fletcher_results_1.csv', csv);
		} else {
			console.log(chalk.red(decodingResult.error));
			const csv = `${original},fail\n`
			appendFileSync('fletcher_results_1.csv', csv);
		}
}




let i = 0;

io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);
	socket.on('frame', (frame) => { 
		let word = words[i];
		if (option == 0) {
			handleHamming(frame, word);
		} else {
			handleFletcher(frame, word);
		}
		i += 1;
	});
});

