/* Test line: man apple 22 654 reddit Dive 456 0 -98 Recompulsion 123 man apple robot regiment LOOP ReX -999 654 tournament Privoz regiment 123 0 -6*/

import {sortings} from './utils.mjs';
import readline from 'readline';

let rl = readline.createInterface(process.stdin, process.stdout);

let recursiveAsyncReadLine = function() {
  rl.question(`Enter at least 10 words and/or digits, devided by spaces: `, answer => {

    if (answer.length < 10) {
      console.log('You haven`t entered enough words or digits!');
      recursiveAsyncReadLine();
    }

    rl.question(`How would you like to sort values?:
    1) Words by name (from A to Z);
    2) Show digits from the smallest?;
    3) Show digits from the biggest?;
    4) Words by quantity of letters?;
    5) Only unique words?;
    6) Only unique values?;\n
    Select (1 - 6) or type 'exit' and press ENTER: `, digit => {
      sortings(answer.split(' '), digit, rl);
      recursiveAsyncReadLine();
    });
  });
}

recursiveAsyncReadLine();