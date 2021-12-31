const inquirer = require('inquirer');
const db = require('../db/connection');
const deptArr = require('./departments.json');
const rolesArr = require('./roles.json');
const managersArr = require('./managers.json');

// get inquirer's needed data from sql...
// returnRoles = () => {};
// returnDepts = () => {};
// returnManagers = () => {};
// returnEmploees = () => {};

// turn selection data from inquirer into ids
returnRoleId = (role) => {
    return new Promise((res) => {
        db.query(`
            SELECT roles.id
            FROM roles
            WHERE job_title = '${role}';`, 
            function (err, result) {
                if (err) throw err; 
                roleId = result[0].id;
                res(roleId);
            }
        )
    });
};

returnDeptId = (dept) => {
    return new Promise((res) => {
        db.query(`
            SELECT departments.id
            FROM departments
            WHERE dept_name = '${dept}';`, 
            function (err, result, fields) {
                if (err) throw err; 
                deptId = result[0].id
                console.log(deptId)
                return res(deptId)
            }
        )
    });
};
returnManagerId = (manager) => {
    return new Promise((res) => {  
        db.query(`
            SELECT managers.id
            FROM managers
            WHERE last_name = '${manager}';`, 
            function (err, result, fields) {
                if (err) throw err; 
                managerId = result[0].id;
                res(managerId);
            }
        );
    })

};

createEmployee = async() => {
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
    .then(async answer => {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const roleName = answer.role;
        const roleId = await returnRoleId(roleName)
        const deptName = answer.department;
        const deptId = await returnDeptId(deptName);
        const managerName = answer.manager;
        const managerId = await returnManagerId(managerName);

        console.log("name: ", firstName, lastName, "role: ", roleName, "roleId: ", roleId, "dept: ", deptName, "deptId: ", deptId, managerName, "managerId: ", managerId);
    });
};

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