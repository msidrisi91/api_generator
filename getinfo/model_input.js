const inquirer = require('inquirer');
function input_data(i, auth){
    console.info(`\nEnter the details of model ${i} :`);
    var questions = [{
            type: 'input',
            name: 'name',
            message: "What is the name of the Model?",
        }, {
            type: 'Number',
            name: 'n',
            message: "How many fields will be there? ",
        }, {
            type: 'confirm',
            name: 'timestamp',
            message: "Do you want a timestamp field? ",
            choices: {checked: true}
        }
    ]

    return inquirer.prompt(questions)
    .then(answers => {
        if (answers['n'] <= 0){
            console.log('There must be atleast 1 field');
        } else {
            var fields_prompts = [];
            if(auth) {
                fields_prompts.push({
                    type : 'checkbox',
                    name : 'auth',
                    message : 'Select the routes to be accesed after authentication:',
                    choices: [
                        'GET /' + answers['name'] +'/',
                        'POST /' + answers['name'] +'/',
                        'DELETE /' + answers['name'] +'/',
                        'GET /' + answers['name'] +'/:' + answers['name'] + 'Id',
                        'PUT /' + answers['name'] +'/:' + answers['name'] + 'Id',
                        'DELETE /' + answers['name'] +'/:' + answers['name'] + 'Id',
                    ]
                });
                fields_prompts.push({
                    type : 'confirm',
                    name : 'userPOST',
                    message : "Do you want to record which user POST this model:"
                });
                fields_prompts.push({
                    type : 'confirm',
                    name : 'userGET',
                    message : "Do you want to restrict user to GET only data POSTed by them :",
                    when: function (ans) {
                        return ans['userPOST'] && ans['auth'].includes('GET /' + answers['name'] +'/');
                    }
                });
            }
            var j = 1;
            for(var i = 0; i < answers['n']; i++){
                fields_prompts.push({
                    type: 'input',
                    name: `field${i+1}_name`,
                    message: `Name of field ${i+1}: `
                });
                fields_prompts.push({
                    type: 'list',
                    name: `field${i+1}_type`,
                    choices:['Number', 'String', 'Boolean', 'Date'],
                    message: `Select the type of field ${i+1}:`
                });
                fields_prompts.push({
                    type: 'confirm',
                    name: `field${i+1}_required`,
                    message: `Is field ${i+1} required: `,
                    choices: {checked: true}
                });
                fields_prompts.push({
                    type: 'input',
                    name: `field${i+1}_default`,
                    message: `What is the default value for field ${i+1} (if any): `,
                    default: null,
                    when: function (ans) {
                        var f = 'field'+(j++)+'_required';
                        return !ans[f];
                    }
                });
            }
            return inquirer.prompt(fields_prompts)
            .then((ans) => {
                answers['fields'] = ans;
                return answers;
            })
            .catch(error => {
                console.log(error);
            });
        }
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