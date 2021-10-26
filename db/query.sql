SELECT * FROM department;

SELECT role.id, title, department.name as department, salary FROM role
JOIN department ON role.department_id = department.id;

SELECT employee.id,first_name,last_name,role.title as title, department.name as department, role.salary as salary,manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;
