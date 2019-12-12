const inquirer = require('inquirer');
var mysql = require("mysql");

const { printTable } = require('console-table-printer');

var employeeRolesNames = [];
var employeeManagerArray = [];

var rolesArray = [];
var employeesArray = [];

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
        rolesJSON();
        employeesJSON();
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
let query = `SELECT e.id AS "ID", e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", 
r.title AS "ROLE", d.name AS "DEPARTMENT", r.salary AS "SALARY", 
(select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "MANAGER"
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id = d.id;`;
connection.query(query, function(err, res) {
        if (err) throw err;
        printTable(res);
        cli();
    }); 
}

function viewDepartments() {
let query = `SELECT id as ID, name as "DEPARTMENT NAME" FROM department;`;
    connection.query(query, function(err, res) {
            if (err) throw err;
            printTable(res);
            cli();
        }); 
}

function viewRoles() {
    let query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM role;";
    connection.query(query, function(err, res) {
          if (err) throw err;
          printTable(res);
          cli();
      }); 
  }

//////////////////////////////////////// ADD Functions

async function addEmployee() {
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
        name: "role",
        type: "list",
        message: "What is the ROLE of the Employee ? ",
        choices: employeeRolesNames,
        },
        {
        name: "manager",
        type: "list",
        message: "Who is the MANAGER for the new employee ? ",
        choices: employeeManagerArray,
        }])
        .then(async function(answers) {

        let roleId = getRoleID(answers.role, rolesArray);
        let manId = getManagerID(answers.manager, employeesArray);

        await insertEmployee(answers,roleId,manId);
        
        })
        
   
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

async function rolesJSON(){
        connection.query("SELECT id, title FROM role;", function (err, res) {
            res.forEach(function(row){
                rolesArray.push({id:row.id , title:row.title});
            })
          if (err) throw err;
        });
}

async function employeesJSON(){
    connection.query("SELECT id, first_name FROM employee;", function (err, res) {
        res.forEach(function(row){
            employeesArray.push({id:row.id , first_name:row.first_name, last_name:row.last_name});
        })
      if (err) throw err;
    });
}

async function employeeRoleList(){
    connection.query("SELECT id, title FROM role;", function (err, res) {
        res.forEach(function(row){
            employeeRolesNames.push(row.title);
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

//////////////////////////////////////// Get IDs  Functions

function getRoleID(employeeRole, array){
    for (var i=0; i<array.length; i++) {
        if (array[i].title === employeeRole) {
            return array[i].id;
            }
        }
}

function getManagerID(managerName, array){
    if (managerName === "No Manager"){
        return array.id = null;
      }
    else{
    var splitName = managerName.split(" ");
        for (var i=0; i<array.length; i++) {
            if (array[i].first_name === splitName[0]) {
                return array[i].id;
                }
            }
      } 
    
}

//////////////////////////////////////// INSERT  Functions

function insertEmployee(answers,roleId,manId){
    let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}','${answers.last_name}',${roleId},${manId});`
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.affectedRows + " record inserted");
    cli();
});
}


module.exports = cli;