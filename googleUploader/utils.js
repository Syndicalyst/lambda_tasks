const {google} = require('../../modules/node_modules/googleapis/build/src');
const TinyURL = require('../../modules/node_modules/tinyurl');
const inquirer = require('../../modules/node_modules/inquirer/lib/inquirer');
const fs = require('fs');

const CLIENT_ID = '906830176075-1895oo8b3o6kvjeqle9sr4vv8mv6ibg7.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//045Gp6tAh09ekCgYIARAAGAQSNwF-L9IrSxk2CAGNKm17_dBdpn9x5VxMlpcsVZsyYX62LfyPtYnq5QLdAcD6irX_2et9oiTda9A';

const oath2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oath2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oath2Client
});

async function uploadFile(filePath, fileName, fileExtension) {
  try {
    const responce = await drive.files.create({
      requestBody: {
        name: `${fileName}.${fileExtension}`,
        mimeType: `image/${fileExtension}`
      },
      media: {
        mimeType: `image/${fileExtension}`,
        body: fs.createReadStream(filePath)
      }
    });

    return responce.data.id;

  } catch(error) {
    console.log(error.message);
  }
}
  
async function generatePublicUrl(fileId) {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink'
    });

    return result.data.webViewLink;

  } catch (error) {
    console.log(error);
  }
}
  
function getFilePath() {
  return inquirer.prompt({
    type: 'input',
    name: 'file',
    message: 'Drag and drop file to terminal and press ENTER for upload : ',
    validate(value) {
      if (value == '') {
        return 'Please enter a valid path to file';
      }
      return true;
    },
  });
}
  
function filenameChange() {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'fileConfirm',
    message: 'Would you like to change file name? ',
    default: false,
  }, 
  {
    type: 'input',
    name: 'filenameChanger',
    message: 'Enter a new file name (without extension aka .jpg .png etc.)',
    when(answers) {
      return answers.fileConfirm === true;
    } 
  }]);
}
  
function shortLinkAnswer() {
  return inquirer.prompt({
    type: 'confirm',
    name: 'shortLink',
    message: 'Would you like to create shorter link to file? ',
    default: true,
  });
}
  
function createtinyUrl(url) {              
  TinyURL.shorten(url, function(res, err) {
    if (err) console.log(err);
    console.log(`Your link is: ${res}`);
  });
}

module.exports = {uploadFile, generatePublicUrl, getFilePath, filenameChange, shortLinkAnswer, createtinyUrl};