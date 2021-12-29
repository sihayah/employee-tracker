const mysql = require('mysql2');
const db = require('./db/connection');
const { viewDepts, viewRoles } = require('./lib/view-tables');
const inquirer = require('inquirer');

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
            return viewDepts();
        } else if(action === 'View All Roles') {
            console.log('ROLES...');
            return viewRoles();
        } else if (action === 'View All Employees') {
            console.log('EMPLOYEES')
            return viewEmployees();
        }else {
            start();
        }
    });
};

start();

