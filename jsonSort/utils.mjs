import axios from '../../modules/node_modules/axios/index.js';

const urls = ['https://jsonbase.com/lambdajson_type1/793',
            'https://jsonbase.com/lambdajson_type1/955',
            'https://jsonbase.com/lambdajson_type1/231',
            'https://jsonbase.com/lambdajson_type1/931',
            'https://jsonbase.com/lambdajson_type1/93',
            'https://jsonbase.com/lambdajson_type2/342',
            'https://jsonbase.com/lambdajson_type2/770',
            'https://jsonbase.com/lambdajson_type2/491',
            'https://jsonbase.com/lambdajson_type2/281',
            'https://jsonbase.com/lambdajson_type2/718',
            'https://jsonbase.com/lambdajson_type3/310',
            'https://jsonbase.com/lambdajson_type3/806',
            'https://jsonbase.com/lambdajson_type3/469',
            'https://jsonbase.com/lambdajson_type3/258',
            'https://jsonbase.com/lambdajson_type3/516',
            'https://jsonbase.com/lambdajson_type4/79',
            'https://jsonbase.com/lambdajson_type4/706',
            'https://jsonbase.com/lambdajson_type4/521',
            'https://jsonbase.com/lambdajson_type4/350',
            'https://jsonbase.com/lambdajson_type4/64'];

function loopingObj(obj, objUrl, loopCount, arr) {
  if (obj.hasOwnProperty('isDone')) {
    arr.push(obj.isDone);
    console.log(`${objUrl} isDone - ${obj.isDone}`);
  }
  if (loopCount > 3) {
    console.log(`There is no property 'is Done' in current flow...`);
    return;
  }
  for (let [key, value] of Object.entries(obj)) {
    if (typeof(value) == 'object' && loopCount <= 3) loopingObj(value, objUrl, loopCount + 1, arr);
  }
}

function displayResult(objArr) {
  let resultsArr = [];

  objArr.forEach((value, key, map) => {
    loopingObj(key, value, 1, resultsArr);
  });
  
  let trueCount = 0;
  let falseCount = 0;
  for (let i = 0; i < resultsArr.length; i++) {
    if (resultsArr[i] == true) trueCount += 1;
    if (resultsArr[i] == false) falseCount += 1;
  }

  console.log(`\nTrue values: ${trueCount}\nFalse values: ${falseCount}\n`);
}

async function gettingUrls(url, objectMap) {

  const config = {
    method: 'get',
    url: url
  }
  
  let res = await axios(config);
  objectMap.set(res.data, url);

  if (objectMap.size == urls.length) {
    displayResult(objectMap);
  }
}

export function gettingValues() {
  let objectMap = new Map();
  urls.forEach(el => {
    gettingUrls(el, objectMap);
  });
}