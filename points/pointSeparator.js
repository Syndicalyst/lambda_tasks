function pointSeparator(str) {
  const result = [];

  if (str.length < 2) {
    result.push(str);
    return result;
  }

  for (let i = 0; i < 2 ** (str.length - 1); i++) {
    let temp = str[0];
    [...i.toString(2).padStart(str.length - 1, '0')].forEach((elem, i) => {
      temp += ((elem == 0) ? '' : '.') + (str[i + 1]);
    });
    result.push(temp);
  }

  console.log(result);
}
   
pointSeparator('abcd');