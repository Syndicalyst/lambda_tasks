const path = require('path');
const utils = require('./utils');

async function main() {
  try {
    const filePath = await utils.getFilePath();

    let fileName = path.basename(filePath.file).split('.').slice(0, -1).join('.');
    let fileExtension = path.basename(filePath.file).split('.').slice(1).join('.');
    console.log(`Path to file: ${filePath.file}\n`,`File Name: ${path.basename(filePath.file)}\n`,`File extension ${fileExtension}`);

    const nameChange = await utils.filenameChange();
    const shortLink = await utils.shortLinkAnswer();

    if (nameChange.fileConfirm == true) {
      fileName = nameChange.filenameChanger;
    }

    let id = await utils.uploadFile(filePath.file, fileName, fileExtension);
    let url = await utils.generatePublicUrl(id);

    if (shortLink.shortLink) {
      utils.createtinyUrl(url);
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();