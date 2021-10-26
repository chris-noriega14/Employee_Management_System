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
    database: 'test'
}
);
db.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());