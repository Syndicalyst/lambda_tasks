const inquirer = require('../../modules/node_modules/inquirer');
const fs = require('fs');

let answersContainer = [];

try {
  let dataBase = fs.readFileSync('./database.json', 'utf8');
  answersContainer = dataBase == '' ? [] : JSON.parse(dataBase);
} catch(err) {}

let userNameInit = () => {
  return inquirer.prompt({
    type: 'input',
    name: 'user',
    message: 'Enter the user`s name. To cancel press ENTER: ',
    validate(value) {
      const pass = value.match(/\b\S{3,}\b/);
      if (pass || value == '') {
        return true;
      }
      return 'Please enter a valid name!';
    },
  });
}

async function main() {
  try {
    const answer = await userNameInit();

    if (answer.user == '') {
      const viewList = await inquirer.prompt({
        type: 'confirm',
        name: 'listViewer',
        message: 'Would you like to search user the list? ',
        default: true,
      });

      console.log(answersContainer);

      if (viewList.listViewer == false) {
        return;
      }

      return inquirer.prompt({
        type: 'input',
        name: 'nameFinder',
        message: 'Type user`s name you want to find in DB: ',
      }).then((answers) => {

        if (answersContainer.find(element => answers.nameFinder == element.user)) {
          console.log(`User ${answers.nameFinder} info: `);
          console.log(answersContainer.find(element => answers.nameFinder == element.user));
        } else {
          console.log(`User ${answers.nameFinder} isn't in your list.`);
        }
      });
    } else {

      return inquirer.prompt(userQuestions).then((answers) => {
        answersContainer.push(Object.assign(answer, answers));
        fs.writeFileSync('./database.json', JSON.stringify(answersContainer, null, '  '));
  
        return main();

      });
    }
  } catch(err) {
    console.log(err.message);
  }
}

const userQuestions = [
  {
    type: 'list',
    name: 'gender',
    message: 'Choose your gender ',
    choices: ['male', 'female'],
  }, 
  {
    type: 'input',
    name: 'age',
    message: 'Enter your age: ',
    validate(value) {
      const pass = value.match(/\b\d{1,3}\b/);
      if (pass && value < 150) {
        return true;
      }
      return 'Please enter a valid human age';
    },
  },
];

main();