const fs = require('fs');

const executionTimeMeasurement = (func) => {
  let startTime = performance.now()

  func();   
      
  let endTime = performance.now()

  console.log(`Call to '${func.name}' took ${(endTime - startTime) / 1000} seconds`)
}

const createArrayOfFiles = () => {
  try { 
    const files = fs.readdirSync(`./txt/./`, `utf8`); 
    const editedArray = files.map((el) => {
      return el.replaceAll('"', '').replaceAll('\r', '');
    })
    return editedArray;
  } catch(e) {
    console.log(e.message);
  }
}

const uniqueValues = () => {
  const uniqueValues = new Set();
  const files = createArrayOfFiles();

  files.forEach(file => {
    try {
      const data = fs.readFileSync(`./txt/${file}`, 'utf-8').split('\n');
      for (let elem of data) {
        uniqueValues.add(elem);
      }
    } catch(e) {
      console.log(e.message);
    }
  })
  console.log(uniqueValues.size);
}

/* First variant of existInAllFiles - more laconic but less efficient
const existInAllFiles = () => {
  let files = createArrayOfFiles();
  let valuesInAllFiles = new Set(fs.readFileSync(`./txt/${files[0]}`, 'utf-8').split('\n'));
  files = files.slice(1, files.length);

  files.forEach(file => {
    const data = fs.readFileSync(`./txt/${file}`, 'utf-8').split('\n');
    valuesInAllFiles.forEach((elem, value, set) => {
      if (!data.includes(elem)) {
        valuesInAllFiles.delete(elem);
      }
    })
  });
	
  console.log(valuesInAllFiles.size);
}*/

const existInAllFiles = () => {
  let files = createArrayOfFiles();
  let valuesInAllFiles = new Map();
  const firstFileData = fs.readFileSync(`./txt/${files[0]}`, 'utf-8').split('\n');

  for (let elem of firstFileData) {
    valuesInAllFiles.set(elem, [files[0]]);
  }

  files = files.slice(1, files.length);

  files.forEach(file => {
    const data = fs.readFileSync(`./txt/${file}`, 'utf-8').split('\n');
    for (let elem of data) {
      if (valuesInAllFiles.has(elem)) {
        if (!valuesInAllFiles.get(elem).includes(file)) {
          valuesInAllFiles.set(elem, valuesInAllFiles.get(elem).concat([file]));
          continue;
        }
        continue;
      } else if (!valuesInAllFiles.has(elem)) {
        valuesInAllFiles.set(elem, [file]);
      }
    }
  });

  valuesInAllFiles.forEach((value, key, map) => {
    if (value.length < files.length + 1) {
      valuesInAllFiles.delete(key);
    }
  })

  console.log(valuesInAllFiles.size);
}

const existInAtLeastTen = () => {
  let files = createArrayOfFiles();
  let valuesInAtLeastTen = new Map();
  const firstFileData = fs.readFileSync(`./txt/${files[0]}`, 'utf-8').split('\n');

  for (let elem of firstFileData) {
    valuesInAtLeastTen.set(elem, [files[0]]);
  }

  files = files.slice(1, files.length);

  files.forEach(file => {
    const data = fs.readFileSync(`./txt/${file}`, 'utf-8').split('\n');
    for (let elem of data) {
      if (valuesInAtLeastTen.has(elem)) {
        if (!valuesInAtLeastTen.get(elem).includes(file)) {
          valuesInAtLeastTen.set(elem, valuesInAtLeastTen.get(elem).concat([file]));
          continue;
        }
        continue;
      } else if (!valuesInAtLeastTen.has(elem)) {
        valuesInAtLeastTen.set(elem, [file]);
      }
    }
  });

  valuesInAtLeastTen.forEach((value, key, map) => {
    if (value.length < 10) {
      valuesInAtLeastTen.delete(key);
    }
  })

  console.log(valuesInAtLeastTen.size);
}

executionTimeMeasurement(uniqueValues);
executionTimeMeasurement(existInAllFiles);
executionTimeMeasurement(existInAtLeastTen);
