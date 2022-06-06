process.env.NTBA_FIX_319 = 1;
process.env["NTBA_FIX_350"] = 1;
const TelegramBot = require('../../modules/node_modules/node-telegram-bot-api');
const program = require('../../modules/node_modules/commander');

const token = '5418084146:AAGIUtylrbPzpXWU7WfBafUtEpI-lqrLWHA';
const bot = new TelegramBot(token);


program
  .name('telegramBot')
  .description('Working with Telegram Bot in JS');

program.command('message')
  .alias('m')
  .description('Send a message to your Telegram Bot')
  .argument('<string>', 'string to send')
  .action((str) => {
    bot.sendMessage(445300838, str);
  });

program.command('photo')
  .alias('p')
  .description('Send any photo to your bot')
  .argument('<path>', 'Path to your photo')
  .action((filePath) => {
    bot.sendPhoto(445300838, filePath);
  });

program.parse();
