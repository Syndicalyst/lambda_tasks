function sortString(a, b) {
  let x = a.toUpperCase(),
      y = b.toUpperCase();
  return x == y ? 0 : x > y ? 1 : -1;
}

export function sortings(array, x, consoleInput) {
  let temp;

  switch (x) {
    case '1':
      temp = [];
      for (let elem of array) {
        if (isNaN(elem)) {
          temp.push(elem);
        }
      }
      console.log(temp.sort(sortString));
      break;
    case '2':
      temp = [];
      for (let elem of array) {
        if (!isNaN(elem)) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => a - b));
      break;
    case '3':
      temp = [];
      for (let elem of array) {
        if (!isNaN(elem)) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => b - a));
      break;
    case '4':
      temp = [];
      for (let elem of array) {
        if (isNaN(elem)) {
          temp.push(elem);
        }
      }
      console.log(temp.sort((a, b) => a.length - b.length));
      break;
    case '5':
      temp = new Set();
      for (let elem of array) {
        if (isNaN(elem)) {
          temp.add(elem);
        }
      }
      console.log(Array.from(temp));
      break;
    case '6':
      temp = new Set();
      for (let elem of array) {
          temp.add(elem);
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