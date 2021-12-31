SELECT*FROM departments;

SELECT roles.id, job_title, salary, dept_name
FROM roles
    JOIN departments
    ON roles.department_id = departments.id;

SELECT employees.id, last_name, first_name, job_title, dept_name
FROM employees
    JOIN roles
    ON employees.role_id = roles.id
    JOIN departments
    ON roles.department_id = departments.id;

UPDATE employees
SET role_id = 3
WHERE employees.id = 5;

SELECT roles.id
FROM roles
WHERE job_title = 'Department Head';

SELECT id, last_name, first_name
FROM employees;

SELECT * FROM roles;