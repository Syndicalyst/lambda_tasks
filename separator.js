function isBit(num, iterator) {
  return (num & (1 << iterator)) != 0;
}

function pointSeparator(str) {
  let result = [];
  for (let i = 0; i < Math.pow(2, str.length - 1); i++) {
    let temp = '';
    for (let j = 0; j < str.length; j++) {
      temp += str[j];
      if (isBit(i, j)) {
        temp += '.';
      }
    }
    result[i] = temp;
  }
  console.log(result);
}

pointSeparator('abcd');