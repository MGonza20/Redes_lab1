import chalk from 'chalk';
import express from 'express';
import {Server} from 'socket.io';
import { decodeWithHamming, encodeWithHamming } from './algorithms/hamming';
import { binaryStringToAscii, asciiToBinaryString } from './utils';
import { appendFileSync } from "fs";
import { words } from './words';


const app = express();

const server = app.listen(3000, () => {
  console.log('Listening at port 3000');
});

const io = new Server(server);

let i = 0;

io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);
	socket.on('frame', (frame) => { 
		let word = words[i];
		let original = encodeWithHamming(asciiToBinaryString(word)).value![0];
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
		i += 1;
	});
});


