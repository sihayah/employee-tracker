const db = require('../db/connection');

viewDepts = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`SELECT*FROM departments;`, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        });
    });
};

viewRoles = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
        SELECT roles.id, job_title, salary, dept_name
        FROM roles
            JOIN departments
            ON roles.department_id = departments.id;`, 
            function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        });
    });
};

viewEmployees = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
        SELECT employees.id, last_name, first_name, job_title, dept_name
        FROM employees
        JOIN roles
            ON employees.role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id;`, 
            function (err, result, fields) {
        if (err) throw err; 
        console.table(result);
        });
    });
};

module.exports = { viewDepts, viewRoles, viewEmployees };