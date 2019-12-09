const inquirer = require('inquirer');
// const cTable = require('console.table');
var mysql = require("mysql");

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

var roleChoicesArray = [];
var employeeChoicesArray = [];
var departmentChoicesArray = [];

function cli() {
  inquirer.prompt({
    name: "options",
    type: "list",
    message: "Please select the function : ",
    choices: [ "View Employees", "View Departments", "View Roles", "Add Employee","Add Departments", "Add Role","Update Employee Roles"],
  })
  .then(function(answers) {
    switch (answers.options) {

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
        roleList();
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

//////////////////////////////////////// VIEW Functions

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
let query = `SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", 
r.title AS "Role", d.name AS "Department", r.salary AS "Salary", 
(select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "Manager"
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id = d.id;`;
connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
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

//////////////////////////////////////// ADD Functions


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
        var query = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
            
        connection.query(query, [answers.title, answers.salary, answers.department_id], function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Record Inserted");
    
            cli();
        });
    });
}

function addEmployee() {
    inquirer
        .prompt([{
        name: "first_name",
        type: "input",
        message: "What is the First name of the Employee ? "
        },
        {
        name: "last_name",
        type: "input",
        message: "What is the Last name of the Employee ? "
        },
        {
        name: "role_id",
        type: "list",
        message: "What is the Role ID of the Employee ? ",
        choices: choicesArray
        },
        {
        name: "manager_id",
        type: "input",
        message: "What is the Managers id of the Employee ? "
        }])
        .then(function(answers) {
        var query = "UPDATE TABLE employee SET  WHERE ?";
        var query = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)";
            
        connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            
            cli();
        });
    });
}

//////////////////////////////////////// UPDATE CHOICES Functions


async function roleList(){
        connection.query("SELECT id, title FROM role;", function (err, result) {
            result.forEach(function(row){
                roleChoicesArray.push(row.id + " - " + row.title);
            })
          if (err) throw err;
        });
}

async function employeeList(){
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, result) {
        result.forEach(function(row){
            employeeChoicesArray.push(row.id + " - " + row.first_name + " " + row.last_name);
        })
      if (err) throw err;
    });
}

async function departmentList(){
    connection.query("SELECT id, name FROM department;", function (err, result) {
        result.forEach(function(row){
            departmentChoicesArray.push(row.id + " - " + row.name);
        })
      if (err) throw err;
    });
}

  module.exports = cli;