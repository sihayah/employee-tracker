const db = require('../db/connection');
const inquirer = require('inquirer');
const restartMenu = require('../server');

viewDepts = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
                    SELECT*FROM departments
                    ORDER BY 1;`, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        restartMenu();
        });
    })
};

viewRoles = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
        SELECT roles.id, job_title, salary, dept_name
        FROM roles
            JOIN departments
            ON roles.department_id = departments.id
        ORDER BY 2;`, 
            function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        restartMenu();
        });
    })
};

viewEmployees = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
        SELECT employees.id, employees.last_name, employees.first_name, job_title, dept_name, salary, managers.last_name AS manager
        FROM employees
        JOIN roles
            ON employees.role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id
        JOIN managers
            ON employees.manager_id = managers.id
        UNION SELECT managers.id, last_name, first_name, job_title,  salary, dept_name, NULL AS manager 
        FROM managers
        JOIN roles
            ON managers.management_role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id
        ORDER BY 2`, 
            function (err, result, fields) {
        if (err) throw err; 
        console.table(result);
        restartMenu();
        });
    });
};

module.exports = { viewDepts, viewRoles, viewEmployees };