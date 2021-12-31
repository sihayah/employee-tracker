const mysql = require('mysql2');
const db = require('./db/connection');
const { viewDepts, viewRoles, viewEmployees } = require('./lib/view-tables');
const { createDept, createRole, createEmployee, updateEmployeeRole} = require('./lib/create');
const inquirer = require('inquirer');

handleAction = (answer) => {
    const action = answer.action
    switch(action) {
        case 'View All Departments':
            viewDepts();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add Department':
            createDept();
            break;
        case 'Add Role':
            createRole();
            break;
        case 'Add an Employee':
            createEmployee();
            break;
        case "Update an Employee's Role":
            updateEmployeeRole();
            break;
        case "Exit":
            console.log("Bye");
            db.end();
        default: 
            restart();
    };
};

restart = () => {
    inquirer.prompt (
        {
            type:'confirm',
            name: 'restart',
            message: 'Would you like to make another selection?'
        }
    )
};

menu= async() => {
    await inquirer.prompt (
        {
            type: 'list',
            name: 'action',
            message: 'OPTIONS: ',
            choices: [
                'View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add an Employee', "Update an Employee's Role", "Exit"
            ]
    })
    .then(answer => {
        handleAction(answer);
    })
};

menu();

module.exports = restart;