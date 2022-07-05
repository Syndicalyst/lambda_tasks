const express = require('../../modules/node_modules/express');
const app = express();
const {createJSONResponse} = require('./utils');
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is working!");
});

app.post('/', (req, res) => {
  let obj = createJSONResponse(req.body);
  if (obj != undefined) {
    console.log(obj);
    res.send(obj);
    return;
  }
  res.send("Input data does not match required parameters!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});