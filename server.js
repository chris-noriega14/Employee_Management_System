// const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2"); 
require('dotenv').config();

const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
            addRole();
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
    db.query('SELECT * FROM department', function (err,result) {
        if (err) throw err;
    
    inquirer
    .prompt(
    [
        {
        type: 'input',
        message: "What is the employee's first name?",
        name: "new_role_fname",
        },
        {
        type: 'input',
        message: "What is the employee's last name?",
        name: "new_role_lname",
        },
        {
        type: 'list',
        message: "What is the employee's role?",
        name: "new_role",
        choices: result.map(department => department.name)
        },
        {
        type: 'list',
        message: "Who is the employee's manager?",
        name: "new_mgr",
        choices: result.map(department => department.name)
        }
    ])  
    .then(answers => {
        const departmentResult = result.find(department => department.name === answers.new_role_dept)
        db.query('INSERT INTO role SET ?',
        {
            first_name: answers.new_role_fname,
            last_name: answers.new_role_lname,
            role_id: answers.new_role,
            manager_id:answers.new_mgr,
            department_id: departmentResult.id //Equivalent to department.name's id
        }, 
        function (err, results) 
        {
            emsInitialPrompt ();
        })
    })
})
}

function updateRole () { 
    db.query('SELECT * FROM employee', function (err,result) {
        if (err) throw err;
        inquirer
        .prompt(
        [
            {
            type: 'list',
            message: "Choose the employee id whose role you have to change.",
            name: "new_emp_role",
            choices: result.map(employee => employee.id)
            }
        ]) .then(answers => {
            const employeeResult = answers.new_emp_role;
            db.query('SELECT * FROM role', function (err,result) {
                if (err) throw err;
                inquirer
                    .prompt([
            {
            type: 'list',
            message: "Select employee's new role",
            name: "role_id",
            choices: result.map(role => role.title)
            }
        ]) .then(answers => {
            const newRole = result.find(role => role.title = answers.role_id)
            db.query("UPDATE employee SET ? WHERE id = " + "'" + employeeResult + "'", {
                role_id: "" + newRole.id + "",
              },
              function (err) {
                  if (err) throw err;
                  console.log("Successfully updated " + employeeResult + "'s role to " + answers.role_id + "!");
                emsInitialPrompt ();
              }
            )
        })
            })
        }) 
    }, function () {
        emsInitialPrompt ();
    }) 
}

function roleTable () {
    db.query('SELECT role.id, title, department.name as department, salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
    }

function addRole () { 
db.query('SELECT * FROM department', function (err,result) {
    if (err) throw err;

    inquirer
        .prompt(
        [
            {
            type: 'input',
            message: "What is the name of the role?",
            name: "new_role_name"
            },
            {
            type: 'input',
            message: "What is the salary of the role?",
            name: "new_role_salary"
            },
            {
            type: 'list',
            message: "What department does the role belong to?",
            name: "new_role_dept",
            choices: result.map(department => department.name)
            }
        ])  
        .then(answers => {
            const departmentResult = result.find(department => department.name === answers.new_role_dept)
            db.query('INSERT INTO role SET ?',
            {
                title: answers.new_role_name,
                salary: answers.new_role_salary,
                department_id: departmentResult.id //Equivalent to department.name's id
            }, 
            function (err, results) 
            {
                emsInitialPrompt ();
            })
        })
})
}

function departmentTable () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        emsInitialPrompt ();
        });
    }

function addDepartment () { 
    inquirer
        .prompt([{
            type: 'input',
            message: "Please enter new department name",
            name: "add_dept"
        }]) 
        .then(answers => {
            db.query('INSERT INTO department SET ?',{
                name:answers.add_dept
            }, 
            function (err, results) 
            {
                emsInitialPrompt ();
            })
        })
}






            

// db.promise().query("SELECT 1")
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then( () => con.end());