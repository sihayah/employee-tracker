INSERT INTO departments (dept_name)
VALUES ('design'), ('development'), ('management');

INSERT INTO roles (job_title, salary, department_id)
VALUES ('UI/UX designer', 75000, 1), ('Graphic Designer', 72000, 1), ('Front-end Developer', 70000, 2), ('Back-end developer', 80000, 2), ('Office manager', 65000, 3), ('Department head', 90000, 3);

INSERT INTO managers (first_name, last_name, department_id, management_role_id)
VALUES ('Guillermo', 'Rodriguez', 3, 5), ('Sofi', 'West', 3, 6),('Ha-yoon', 'Park', 3, 6), ('Do-Yun', 'Kim', 3, 6);

INSERT INTO employees (first_name, last_name, department_id, role_id, manager_id)
VALUES ('Millie', 'Moss', 1, 1, 1), ('Xena', 'Patel', 1, 1, 1), ('Yoshi', 'Ito', 1, 2, 1),('Yuki', 'Nakamura', 1, 2, 2), ('Bernice', 'Olivier', 2, 3, 2), ('Margarita', 'Gonzalez', 2, 3, 2), ('Issa', 'Ahmed', 2, 4, 3), ('Fatima', 'Baquri', 2, 4, 3), ('Ali', 'Arain', 2, 4, 4), ('Prisha', 'Das', 2, 4, 4);

