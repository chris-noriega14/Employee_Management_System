const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2"); 
require('dotenv').config();

const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get the client //Section 12, Act 12
// const mysql = require("mysql2"); 
// create the connection
const db = mysql.createConnection(
  {
    host:'localhost', 
    user: dbUsername, 
    password: dbPassword,
    database: 'ems_db'
},
    console.log("Connected to the ems_db database.")
    
);
emsInitialPrompt();

function emsInitialPrompt () {
inquirer
        .prompt([
            {
                type:"list",
                name:"ems_suite",
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employee","Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department","Quit"]
            }
        ])

        .then(function(response) {
        let contactInfo = ""
        if(response.ems_suite === "View All Employees") {
            employeeTable();
        }
        else if (response.ems_suite === "Add Employee") {
            addEmployee();
        }
        else if (response.ems_suite === "Update Employee Role") {
            updateRole();
        }
        else if (response.ems_suite === "View All Roles") {
            roleTable();
        }
        else if (response.ems_suite === "Add Roles") {
            addRoles();
        }
        else if (response.ems_suite === "View All Departments") {
            departmentTable();
        }
        else if (response.ems_suite === "Add Department") {
            addDepartment();
        }
        else if (response.ems_suite === "Quit") {
            process.exit(0);
        } 
        })}

function employeeTable () {
    db.query('SELECT employee.id,first_name,last_name,role.title as title, department.name as department, role.salary as salary,manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
    }

function addEmployee () {  
    emsInitialPrompt ();
}

function updateRole () { 
    emsInitialPrompt ();
}

function roleTable () {
    db.query('SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
    }

function addRoles () {   
    emsInitialPrompt ();
}

function departmentTable () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
    }

function addDepartment () {  
    let dept = process.argv[0];
    db.query('INSERT INTO department (name) VALUES (`${dept}`)', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
}








            

// db.promise().query("SELECT 1")
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then( () => con.end());