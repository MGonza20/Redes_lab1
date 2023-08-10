import chalk from 'chalk';
import prompt from 'prompt-sync';
import { addNoiseToFrame, asciiToBinaryString } from "./utils";
import { io } from "socket.io-client";
import { encodeWithHamming } from './algorithms/hamming';

import { generate, count } from "random-words";
import { words } from './words';

// let n = prompt()(chalk.yellow('Ingrese frame para realizar decoding: '));
const socket = io('http://localhost:3000');



socket.on('connect', () => {
	console.log(chalk.green('Conectado al servidor'));
	for (const word of words) {
		// ----- Presentacion -----
		let frame = asciiToBinaryString(word);
		// ----- Enlace -----
		let encodedFrame = encodeWithHamming(frame).value![0];
		// ----- Ruido -----
		encodedFrame = addNoiseToFrame(encodedFrame, 10 / 100);
		// ----- Transmision -----
		socket.emit('frame', encodedFrame);
		console.log('Trama enviada: ' + encodedFrame);
	}
});
