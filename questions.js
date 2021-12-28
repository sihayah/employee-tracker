const inquirer = require('inquirer');
const inquire = require('inquirer');

start = () => {
    inquirer.prompt (
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add an Employee', 'Update an Employee'
            ]
    })
    .then(({action}) => {
        if(action === 'View All Departments') {
            console.log('DEPARTMENTS...');
            // return viewDepts();
        } else if (action === 'View All Roles') {
            console.log('ROLES...');
            // return viewRoles();
        } else if (action === 'View All Employees') {
            console.log('EMPLOYEES')
            // return viewEmployees();
        } else if (action === 'Add Department') {
            console.log('ADDING DEPT...')
            // return addDept();
        } else if (action === 'Add Role') {
            console.log('ADDING ROLE...')
            // return addRole();
        } else if (action === 'Add an Employee') {
            console.log('ADDING EMPLOYEE...')
            // return addEmployee();
        } else if (action === 'Update an Employee') {
            console.log('UPDATING EMPLOYEE...')
            // return updateEmployee();
        } else {
            // return start();
        }
    });
};