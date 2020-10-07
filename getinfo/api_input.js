const inquirer = require('inquirer');
function input_data(){
    var questions = [{
            type: 'input',
            name: 'name',
            message: "What is the name of the API?",
        }, {
            type: 'Number',
            name: 'n',
            message: "How many Models will be there?",
        }, {
            type: 'confirm',
            name: 'authentication',
            message: "Do you want to enable user authentication? ",
            choices: {checked: true}
        }, {
            type: 'confirm',
            name: 'cors',
            message: "Do you want to enable cross origin resources? ",
            choices: {checked: true}
        }
    ]
    return inquirer.prompt(questions)
    .then(answers => {
        return answers;
    })
    .catch(error => {
        if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
        } else {
            console.log(error);
        }
    });
}

module.exports.input_data = input_data;