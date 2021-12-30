const inquirer = require('inquirer');
const db = require('../db/connection');
const deptArr = require('./departments.json');
const rolesArr = require('./roles.json');
const managersArr = require('./managers.json');

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
        db.connect(function(err) {
            if (err) throw err;
            db.query(`
                    INSERT INTO departments (dept_name)
                    VALUES ('${newDept}')`, 
                function (err, result) {
            if (err) throw err; 
            console.log("|||||||||||||||||||||| ", newDept, "DEPARTMENT CREATED ||||||||||||||||||||||")
            });
        });
    });
};

createEmployee = () => {
    inquirer.prompt (
        [
        {
            type: 'string',
            name: 'lastName',
            message: 'What is the last name of employee you would like to add?'
        },
        {
            type: 'string',
            name: 'firstName',
            message: 'What is the first name of employee you would like to add?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of this employee?',
            choices: rolesArr
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this employee belong to?',
            choices: deptArr
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager does this employee report to?',
            choices: managersArr
        },
        ]
    )
    .then(answer => {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const roleName = answer.role;
        const deptName = answer.department;
        const managerName = answer.manager;
        // console.log(firstName, lastName, roleName, deptName, managerName);
        db.query(`
                SELECT roles.id
                FROM roles
                WHERE job_title = '${roleName}';`, 
                    function (err, result, fields) {
                if (err) throw err; 
                roleId = result[0].id;
                console.log("roleId: ", roleId);
                queryDepts(roleId);
                }
        )
    });
};

queryDepts = (roleId) => {
    db.query(`
        SELECT departments.id
        FROM departments
        WHERE dept_name = '${deptName}';`, 
        function (err, result, fields) {
        if (err) throw err; 
        deptId = result[0].id;
        console.log("roleId:", roleId, "deptId: ", deptId);
        queryManagers(roleId, deptId)
        }
    );
};

queryManagers = (roleId, deptId) => {
    db.query(`
        SELECT managers.id
        FROM managers
        WHERE last_name = '${managerName}';`, 
        function (err, result, fields) {
        if (err) throw err; 
        managerId = result[0].id;
        console.log("roleId:", roleId, "deptId: ", deptId, "managerId: ", managerId)
        }
    );
}

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
        console.log("|||||||||||||||||||||| ", title, "ROLE CREATED |||||||||||||||||||||");
        });
    });
};

module.exports = { 
                    createDept, 
                    createRole,
                    createEmployee
                };