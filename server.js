const mysql = require('mysql2');
const db = require('./db/connection');
const { viewDepts } = require('./lib/view-tables');
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
        } else {
            start();
        }
    });
};

start();

