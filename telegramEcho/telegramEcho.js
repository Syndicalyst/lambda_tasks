process.env.NTBA_FIX_319 = 1;
process.env["NTBA_FIX_350"] = 1;
const TelegramBot = require('../../modules/node_modules/node-telegram-bot-api');
const axios = require('../../modules/node_modules/axios').default;

const token = '5418084146:AAGIUtylrbPzpXWU7WfBafUtEpI-lqrLWHA';
const bot = new TelegramBot(token, {polling: true});

async function downloadImage(msg) {
 
  const url = 'https://picsum.photos/200/300';
 
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  bot.sendPhoto(msg.chat.id, response.data.responseUrl);

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })
 
    response.data.on('error', () => {
      reject()
    })
  })
}

bot.on('message', (msg) => {

  if (msg.text.toString().toLowerCase().includes('photo')) {
    console.log(`User ${msg.from.first_name} ${msg.from.last_name} requested a picture`);
    downloadImage(msg);
  } else {
    console.log(`User ${msg.from.first_name} ${msg.from.last_name} has written ${msg.text}`);
    bot.sendMessage(msg.chat.id, `User ${msg.from.first_name} ${msg.from.last_name} has written ${msg.text}`);
  }
});