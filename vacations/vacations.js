const fs = require('fs');

let jsonString = fs.readFileSync('./workers.json', 'utf8');
let jsonArray = JSON.parse(jsonString);

for (let i = 0; i < jsonArray.length; i++) {
  let formattedWorkerCard = {};
  formattedWorkerCard.id =  jsonArray[i].user._id;
  formattedWorkerCard.name =  jsonArray[i].user.name;
  formattedWorkerCard.weekendDays = [{"startDate": jsonArray[i].startDate, "endDate": jsonArray[i].endDate}];

  for (let j = i; j < jsonArray.length; j++) {

    if (jsonArray[i].user._id == jsonArray[j].user._id && i != j) {
      formattedWorkerCard.weekendDays.push({"startDate": jsonArray[j].startDate, "endDate": jsonArray[j].endDate});
      jsonArray.splice(j, 1);
      j -= 1;
    }

  }
  jsonArray[i] = formattedWorkerCard;
  formattedWorkerCard = {};
}

/* Second variant of formatting json file
let formattedJson = jsonArray.map((el) => {
  let container = {};
  container.id =  el.user._id;
  container.name =  el.user.name;
  container.weekendDays = [{"startDate": el.startDate, "endDate": el.endDate}];

  for (let i = jsonArray.indexOf(el); i < jsonArray.length; i++) {
    if (el.user._id == jsonArray[i].user._id && i != jsonArray.indexOf(el)) {
      container.weekendDays.push({"startDate": jsonArray[i].startDate, "endDate": jsonArray[i].endDate});
      jsonArray.splice(i, 1);
      i -= 1;
    }
  }
  return container;
});

formattedJson.length = jsonArray.length;
*/

let json = JSON.stringify(jsonArray, null, '  ');

try {
  fs.writeFileSync('./final.json', json);
} catch (err) {
  console.error(err);
}

console.log(jsonArray);
