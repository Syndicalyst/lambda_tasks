/* Test line: man apple 22 654 reddit Dive 456 0 -98 Recompulsion 123 man apple robot regiment LOOP ReX -999 654 tournament Privoz regiment 123 0 -6*/

function sortString(a, b) {
  let x = a.toUpperCase(),
      y = b.toUpperCase();
  return x == y ? 0 : x > y ? 1 : -1;
}

function digitChecker(digit) {
  return digit >= '0' && digit <= '9';
}

function charChecker(char) {
  return char >= 'A' && char <= 'z';
}

let readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);

function sortings(array, x, consoleInput) {
  let temp;

  switch (x) {
    case '1':
      temp = [];
      for (let elem of array) {
        if (charChecker(elem[0])) {
          temp.push(elem);
        }
      }
      console.log(temp.sort(sortString));
      break;
    case '2':
      temp = [];
      for (let elem of array) {
        if (digitChecker(elem[0]) || elem[0] == '-' && digitChecker(elem[1])) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => a - b));
      break;
    case '3':
      temp = [];
      for (let elem of array) {
        if (digitChecker(elem[0]) || elem[0] == '-' && digitChecker(elem[1])) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => b - a));
      break;
    case '4':
      temp = [];
      for (let elem of array) {
        if (charChecker(elem[0])) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => a.length - b.length));
      break;
    case '5':
      temp = new Set();
      for (let elem of array) {
        if (charChecker(elem[0])) {
          temp.add(elem);
        }
      }
      console.log(Array.from(temp));
      break;
    case 'exit':
      console.log('\nShutting down...\n');
      consoleInput.close();
      process.exit();
    default:
      console.log('Wrong value!');
      break;
  }
}

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
    5) Only unique words?;\n
    Select (1 - 5) or type 'exit' and press ENTER: `, digit => {
      sortings(answer.split(' '), digit, rl);
      recursiveAsyncReadLine();
    });
  });
}

recursiveAsyncReadLine();