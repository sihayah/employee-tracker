const inquirer = require('inquirer');
const rolesArr = require('./roles.json')


updateEmployeeRole = () => {
    inquirer.prompt (
        {
            type: 'list',
            name: 'jobTitle',
            message: "Employee's job title:",
            choices: rolesArr
        }
    );
};

updateEmployeeRole();