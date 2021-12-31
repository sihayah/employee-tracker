const db = require('./db/connection');
const inquirer = require('inquirer');


startMenu = async() => {
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
});
}


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
            db.end();
    };
};

restartMenu = () => {
    inquirer.prompt (
        {
            type:'confirm',
            name: 'restart',
            message: 'Would you like to make another selection?'
        }
    )
        .then(answer => {
            switch(answer.restart) {
                case true:
                    startMenu();
                    break;
                case false:
                    db.end();
                    break;
            };
        });
};

returnDeptsArr = () => {
    return new Promise((res) => {
        db.query(`
            SELECT dept_name
            FROM departments
            ORDER BY 1`, 
            function (err, result) {
                let rolesArr = []
                if (err) throw err; 
                result.forEach(result => rolesArr.push(result.dept_name))
                // console.log(rolesArr)
                res(rolesArr);
            }
        )
    });
};

returnRolesArr = () => {
    return new Promise((res) => {
        db.query(`
            SELECT job_title
            FROM roles
            ORDER BY 1`, 
            function (err, result) {
                let rolesArr = []
                if (err) throw err; 
                result.forEach(result => rolesArr.push(result.job_title))
                // console.log(rolesArr)
                res(rolesArr);
            }
        )
    });
};

returnManagersArr = () => {
    return new Promise((res) => {
        db.query(`
            SELECT last_name
            FROM managers
            ORDER BY 1`, 
            function (err, result) {
                let managersArr = []
                if (err) throw err; 
                result.forEach(result => managersArr.push(result.last_name))
                // console.log(managersArr)
                res(managersArr);
            }
        )
    });
};

returnEmployeesArr = () => {
    return new Promise((res) => {
        db.query(`
            SELECT last_name, first_name
            FROM employees
            ORDER BY 1`, 
            function (err, result) {
                let employeesArr = []
                if (err) throw err; 
                result.forEach(result => employeesArr.push(`${result.last_name}, ${result.first_name}`))
                // console.log(employeesArr)
                res(employeesArr);
            }
        )
    });
};

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

returnDeptId = (role) => {
    return new Promise((res) => {
        db.query(`
            SELECT department_id
            FROM roles
            WHERE job_title = '${role}';`, 
            function (err, result) {
                if (err) throw err; 
                deptId = result[0].department_id
                // console.log(deptId)
                return res(deptId)
            }
        )
    });
};

returnDeptIdByName = (name) => {
    return new Promise((res) => {
        db.query(`
            SELECT departments.id
            FROM departments
            WHERE dept_name = '${name}';`, 
            function (err, result) {
                if (err) throw err; 
                deptId = result[0].id;
                // console.log(deptId)
                return res(deptId)
        })
    })
};

returnManagerId = (manager) => {
    return new Promise((res) => {  
        db.query(`
            SELECT managers.id
            FROM managers
            WHERE last_name = '${manager}';`, 
            function (err, result) {
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
            message: "Last name:"
        },
        {
            type: 'string',
            name: 'firstName',
            message: "First name:"
        },
        {
            type: 'list',
            name: 'role',
            message: 'Role:',
            choices: await returnRolesArr()
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager does this employee report to?',
            choices: await returnManagersArr()
        },
        ]
    )
    .then(async answer => {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const roleName = answer.role;
        const roleId = await returnRoleId(roleName);
        const deptId = await returnDeptId(roleName);
        const managerName = answer.manager;
        const managerId = await returnManagerId(managerName);

        db.connect(function(err) {
            if (err) throw err;
            db.query(`
                    INSERT INTO employees (last_name, first_name, role_id, department_id, manager_id)
                    VALUES ('${lastName}', '${firstName}', '${roleId}', '${deptId}', '${managerId}')`, 
                function (err, result) {
            if (err) throw err; 
            console.log('')
            console.log(' ...................................................................................................'),
            console.log(`    '${firstName} ${lastName}' has been added to EMPLOYEES`),
            console.log(' ...................................................................................................');
            })
        })

        restartMenu();
    })
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
            console.log(' ...................................................................................................');
            console.log(`    ${newDept} DEPARTMENT CREATED`);
            console.log(' ...................................................................................................');
            restartMenu();
            });
        });
    });
};

createRole = async() => {
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
            choices: await returnDeptsArr()
        }
        ]
    )
    .then(async answer => {
        const jobTitle = answer.jobTitle;
        const roleSalary = answer.salary;
        const deptName = answer.department;
        const deptId = await returnDeptIdByName(deptName);
        setRole(jobTitle, roleSalary, deptId)

        console.log(' ...................................................................................................')
        console.log(`    ${jobTitle} ROLE CREATED`);
        console.log(' ...................................................................................................')
        restartMenu();

    });
};

setRole = (title, salary, id) => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`
                INSERT INTO roles (job_title, salary, department_id)
                VALUES ('${title}', '${salary}', '${id}')`, 
            function (err, result, fields) {
                if (err) throw err; 
        }); 
    });
};

updateEmployeeRole = async() => {
    inquirer.prompt(
        [
        {
            type: 'list',
            name: 'name',
            message: 'Choose the employee to be updated: ',
            choices: await returnEmployeesArr()
        },
        {
            type: 'list',
            name: 'role',
            message: "Employee's job title:",
            choices: await returnRolesArr()
        }
        ]
    )
    .then(async answer => {
            const name = answer.name;
            const role = answer.role;
            const roleID = await returnRoleId(role);
            const deptId = await returnDeptId(role);
            const lastName = name.substring( 0, name.indexOf(","));
            const firstName = name.substring(name.indexOf(",")+2, name.length);

            console.log(" ...................................................................................................");
            console.log(`    The role of '${name}' has been updated to ${role} `);
            console.log(" ...................................................................................................");

            db.query(`
                UPDATE employees
                SET role_id = ${roleId}, department_id = ${deptId} 
                WHERE last_name= '${lastName}'
                    AND first_name= '${firstName}';`, 
                function (err, result) {
                    if (err) throw err; 
            })
            restartMenu();
    })
    };

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

startMenu();