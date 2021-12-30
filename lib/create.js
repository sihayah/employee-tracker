const inquirer = require('inquirer');
const db = require('../db/connection');
const deptArr = require('./departments.json')

createDept = () => {
    inquirer.prompt (
        {
            type: 'string',
            name: 'deptName',
            message: 'What is the name of department you would like to create?'
        }
    )
    .then(answer => {
        const newDept = answer.deptName;
        console.log(newDept)
        db.connect(function(err) {
            if (err) throw err;
            db.query(`
                    INSERT INTO departments (dept_name)
                    VALUES ('${newDept}')`, 
                function (err, result, fields) {
            if (err) throw err; 
            console.table(result);
            });
        });
    });
};

createRole = () => {
    inquirer.prompt (
        [
        {
            type: 'string',
            name: 'jobTitle',
            message: 'What is the title of role you would like to create?'
        },
        {
            type: 'string',
            name: 'salary',
            message: 'What is the salary of role you would like to create?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: deptArr
        }
        ]
    )
    .then(answer => {
        const jobTitle = answer.jobTitle;
        const roleSalary = answer.salary;
        const deptName = answer.department;
        console.log(jobTitle, roleSalary, deptName);
        db.query(`
                SELECT departments.id
                FROM departments
                WHERE dept_name = '${deptName}';`, 
                    function (err, result, fields) {
                if (err) throw err; 
                deptId = result[0].id;
                console.log(deptId)
                setDept(jobTitle, roleSalary, deptId);
                });
    });
};

setDept = (title, salary, id) => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
                INSERT INTO roles (job_title, salary, department_id)
                VALUES ('${title}', '${salary}', '${id}')`, 
            function (err, result, fields) {
        if (err) throw err; 
        console.log("Role: ", title, "has been created.");
        });
    });
};

module.exports = { 
                    createDept, 
                    createRole
                };