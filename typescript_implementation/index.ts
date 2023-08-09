import chalk from 'chalk';
import prompt from 'prompt-sync';
import { asciiToBinaryString } from "./utils";

let n = prompt()(chalk.yellow('Ingrese frame para realizar decoding: '));
let frame = asciiToBinaryString(n);
console.log(`Trama a enviar: ${frame}`);