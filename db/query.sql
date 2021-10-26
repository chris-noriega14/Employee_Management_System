SELECT * FROM department;

SELECT id, title, department.name as department, salary FROM role
JOIN department_id ON role.department_id = department.id;

SELECT id,first_name,last_name,role.title as title, department.name as department, role.salary as salary,manager_id
FROM employee
JOIN role_id ON employee.role_id = role.id
JOIN department_id ON role.department_id = department.id;
