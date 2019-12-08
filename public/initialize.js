const inquirer = require('inquirer');
const cTable = require('console.table');
var mysql = require("mysql");


// const viewRoles = require('./viewRoles');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "hr_employees"
    });
    
connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        cli();
      });


function cli() {
  inquirer.prompt({
    name: "options",
    type: "list",
    message: "Please select the function : ",
    choices: [ "View Employees", "View Departments", "View Roles", "Add Employee","Add Departments", "Add Role","Update Employee Roles"],
  })
  .then(function(answer) {
    switch (answer.options) {

    case "View Employees":
            viewEmployees();
        break;

    case "View Departments":
        viewDepartments();
        break;
        
    case "View Roles":
        viewRoles();
        break;

    case "Add Employee":
        addEmployee();
        break;

    case "Add Department":
      addDepartment();
      break;

    case "Add Role":
      addRole();
      break;

    case "Update Employee Roles":
    updateEmployeeRole();
    break;

    }
  });
  }

function viewRoles() {
    let query = "SELECT * FROM role;";
    connection.query(query, function(err, res) {
          if (err) throw err;
          const table = cTable.getTable(res);
          console.table('All Roles are : ',table);
          cli();
      }); 
  }

function viewEmployees() {
let query = "SELECT * FROM employee;";
connection.query(query, function(err, res) {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.table('All Employees are : ',table);
        cli();
    }); 
}

function viewDepartments() {
    let query = "SELECT * FROM department;";
    connection.query(query, function(err, res) {
            if (err) throw err;
            const table = cTable.getTable(res);
            console.table('All Departments are : ',table);
            cli();
        }); 
    }


function addRole() {
    inquirer
        .prompt([{
        name: "title",
        type: "input",
        message: "What is the Role you want to add ? "
        },
        {
        name: "salary",
        type: "input",
        message: "What is the Salary for the role ? "
        },
        {
        name: "department_id",
        type: "input",
        message: "What is the Department ID for the role ? "
        }])
        .then(function(answers) {
        var query = "UPDATE TABLE employee SET  WHERE ?";
        var query = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
            
        connection.query(query, [answers.title, answers.salary, answers.department_id], function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            
            cli();
        });
        });
    }

  module.exports = cli;