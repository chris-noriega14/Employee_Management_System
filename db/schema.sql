DROP DATABASE IF EXISTS EMS_db
CREATE DATABASE EMS_db

USE DATABASE EMS_db

DROP TABLE IF EXISTS department
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY auto_increment,
    name VARCHAR(30) NOT NULL
)

DROP TABLE IF EXISTS role
CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL FOREIGN KEY,
    REFERENCE department(id)
)

DROP TABLE IF EXISTS employee
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY auto_increment,
    first name VARCHAR(30) NOT NULL,
    last name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
)
