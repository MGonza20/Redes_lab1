import chalk from 'chalk';
import prompt from 'prompt-sync';
import { asciiToBinaryString } from "./utils";
import { io } from "socket.io-client";
import { encodeWithHamming } from './algorithms/hamming';


let n = prompt()(chalk.yellow('Ingrese frame para realizar decoding: '));
let frame = asciiToBinaryString(n);
const socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log(chalk.green('Conectado al servidor'));
	const encodedFrame = encodeWithHamming(frame);
	socket.emit('frame', encodedFrame.value![0]);
	console.log('Trama enviada: ' + encodedFrame.value![0]);
});
