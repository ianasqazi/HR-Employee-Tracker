const inquirer = require('inquirer');
var mysql = require("mysql");

const { printTable } = require('console-table-printer');

var employeeRolesArray = [];

var employeeManagerArray = [];
var departmentChoicesArray = [];


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
        employeeRoleList();
        employeeManagerList();
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
        printTable(res);
        cli();
    }); 
}

function viewDepartments() {
let query = "SELECT * FROM department;";
    connection.query(query, function(err, res) {
            if (err) throw err;
            printTable(res);
            cli();
        }); 
}

function viewRoles() {
    let query = "SELECT * FROM role;";
    connection.query(query, function(err, res) {
          if (err) throw err;
          printTable(res);
          cli();
      }); 
  }

//////////////////////////////////////// ADD Functions

function addEmployee() {
    inquirer
        .prompt([{
        name: "first_name",
        type: "input",
        message: "What is the FIRST NAME of the Employee ? "
        },
        {
        name: "last_name",
        type: "input",
        message: "What is the LAST NAME of the Employee ? "
        },
        {
        name: "role_id",
        type: "list",
        message: "What is the ROLE of the Employee ? ",
        choices: employeeRolesArray,
        // filter: function(){ return role_id ; },
        },
        {
        name: "manager_id",
        type: "list",
        message: "Who is the MANAGER for the new employee ? ",
        choices: employeeManagerArray,
        }])
        .then(function(answers) {
            console.log(answers);
        var query = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)";
            
        connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            
            cli();
        });
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
        var query = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`;
            
        connection.query(query, [answers.title, answers.salary, answers.department_id], function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Record Inserted");
    
            cli();
        });
    });
}



//////////////////////////////////////// UPDATE CHOICES Functions


async function employeeRoleList(){
        connection.query("SELECT id, title FROM role;", function (err, result) {
            result.forEach(function(row){
                // employeeRolesArray.push({id:row.id , title:row.title});
                employeeRolesArray.push(row.title);
            })
          if (err) throw err;
        });
}

async function employeeManagerList(){
    employeeManagerArray.push("No Manager");
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, result) {
        result.forEach(function(row){
            
            employeeManagerArray.push(row.first_name + " " + row.last_name);
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

//////////////////////////////////////// Get Opposite  Functions


  module.exports = cli;