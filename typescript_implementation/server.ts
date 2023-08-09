import chalk from 'chalk';
import express from 'express';
import {Server} from 'socket.io';
import { decodeWithHamming } from './algorithms/hamming';
import { binaryStringToAscii } from './utils';

const app = express();

const server = app.listen(3000, () => {
  console.log('Listening at port 3000');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);
	socket.on('frame', (frame) => { 
		console.log('Trama recibida: ' + frame)
		const decodingResult = decodeWithHamming(frame);
		if (decodingResult.isSuccess) {
			const message = binaryStringToAscii(decodingResult.value!);
			console.log(chalk.green('Mensaje recibido: ' + message));
		} else {
			console.log(chalk.red(decodingResult.error));
		}
	});
});
