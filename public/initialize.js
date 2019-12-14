////////////////// Dependencies

const inquirer = require('inquirer');
var mysql = require("mysql");

const { printTable } = require('console-table-printer');

////////////////// Initialize variables and arrays

var employeeRolesNames = [];
var employeeFullName = [];
var roleDepartment = [];

var rolesArray = [];
var employeesArray = [];
var departmentsArray = [];

////////////////// Create Database Connection to MySQL

// IF you connect to local DB use the following connection code
// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "hr_employees"
//     });

var connection = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    port: 3306,
    user: "sql9315636",
    password: "39sVdhEjIi",
    database: "sql9315636"
    });
    
connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        cli();
      });

////////////////// Prompt OPTIONS / FUNCTIONS to choose

function cli() {
  inquirer.prompt({
    name: "options",
    type: "list",
    message: "Please select ONE of the following FUNCTIONS : ",
    choices: [ "View ALL Employees", "View Employees by Manager", "View Employees by Roles", new inquirer.Separator(),
    "View Departments", "View Roles", new inquirer.Separator(),
     "Add Employee","Add Departments", "Add Role", new inquirer.Separator(),
     "Update Employee DETAILS", new inquirer.Separator(),
     "Remove Employee", new inquirer.Separator(),
     "View Budget", new inquirer.Separator(),
     "CLOSE APPLICATION", new inquirer.Separator()],
  })
  .then(async function(answers) {
      // Functions to call based on option choosen
    switch (answers.options) {

    case "View ALL Employees":
        viewEmployees();
        break;

    case "View Employees by Manager":
        employeesJSON();
        setTimeout(viewEmpByManager, 500);
        break;
            
    
    case "View Employees by Roles":
        rolesJSON();
        setTimeout(viewEmpByRoles, 500);
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
        addEmployee();
        break;

    case "Add Departments":
        addDepartment();
        break;

    case "Add Role":
        departmentsJSON();
        addRole();
        break;

    case "Update Employee DETAILS":
        employeesJSON();
        rolesJSON();
        setTimeout(updateEmployeeDetails, 500);
        break;

    case "Remove Employee":
        employeesJSON();
        setTimeout(removeEmployee, 500);
        break;
    
    case "View Budget":
        viewBudget();
        break;
            
    case "CLOSE APPLICATION":
        connection.end();
        console.log("Have a Nice Day ... !!!");
        process.exit();
        break;
     
    }
  });
  }

//////////////////////////////////////// VIEW Functions

// Function to view All Employees details : JOIN of all tables to give detail description
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

// Function to view All Departments
function viewDepartments() {
let query = `SELECT id as ID, name as "DEPARTMENT NAME" FROM department;`;
    connection.query(query, function(err, res) {
            if (err) throw err;
            printTable(res);
            cli();
        }); 
}

// Function to view All Roles
function viewRoles() {
    let query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM role;";
    connection.query(query, function(err, res) {
          if (err) throw err;
          printTable(res);
          cli();
      }); 
  }

// Function to view all Employees working under a Manager
function viewEmpByManager() {
    inquirer.prompt({
        name: "managerName",
        type: "list",
        message: "Choose the Manager you want to see all employees :",
        choices: employeeFullName
    })

    .then(async function(answers) {
        let manId = getManagerID(answers.managerName, employeesArray);

        let query = `SELECT id AS ID, first_name as 'FIRST NAME', last_name as 'LAST NAME' FROM employee WHERE manager_id=${manId};`;
    connection.query(query, function(err, res) {
                if (err) throw err;
                if(res.length === 0){
                    console.log("No Employees working under him !!!");
                }
                else{
                    printTable(res);
                }
            cli();
        }); 
    }) 
}

// Function to view all Employees by choosing the Role 
function viewEmpByRoles() {
    inquirer.prompt({
        name: "roleName",
        type: "list",
        message: "Choose the ROLE you want to see all employees for:",
        choices: employeeRolesNames
    })

    .then(async function(answers) {
        let roleId = getRoleID(answers.roleName, rolesArray);

        let query = `SELECT id AS ID, first_name as 'FIRST NAME', last_name as 'LAST NAME' FROM employee WHERE role_id=${roleId};`;
    connection.query(query, function(err, res) {
                if (err) throw err;
                if(res.length === 0){
                    console.log("No Employees working under this ROLE !!!");
                }
                else{
                    printTable(res);
                }
            cli();
        }); 
    }) 
}
//////////////////////////////////////// ADD Functions

// Function to add a NEW EMPLOYEE
async function addEmployee() {
    inquirer
        .prompt([{
        name: "first_name",
        type: "input",
        message: "What is the FIRST NAME of the Employee ? ",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the Employees FIRST NAME ";
            }
          }
        },
        {
        name: "last_name",
        type: "input",
        message: "What is the LAST NAME of the Employee ? ",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the Employees LAST NAME ";
            }
          }
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
        choices: employeeFullName,
        }])
        .then(async function(answers) {
            // get id's to insert into the database from the options
            // Option choosen is STRING ... table accepts only INT
        let roleId = getRoleID(answers.role, rolesArray);
        let manId = getManagerID(answers.manager, employeesArray);
        
        // Function to insert into the database after getting ids from above
        function insertEmployee(answers,roleId,manId){
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}','${answers.last_name}',${roleId},${manId});`
            connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " record INSERTED");
            cli();
        });
        }

        insertEmployee(answers,roleId,manId);

        })
        
   
}

// Function to add a NEW DEPARTMENT
async function addDepartment() {
    inquirer
        .prompt({
        name: "depName",
        type: "input",
        message: "What is the DEPARTMENT NAME you want to add ? ",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the new DEPARTMENT's Name";
            }
          }
        }
        )
        .then(function(answers) {
            let query = `INSERT INTO department (name) VALUES('${answers.depName}');`
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " record INSERTED");
                cli();
            });

        })
}

// Function to add a NEW ROLE
async function addRole() {
    inquirer
        .prompt([{
        name: "title",
        type: "input",
        message: "What is the ROLE NAME you want to add ? ",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the new ROLE Name";
            }
          }
        },
        {
        name: "salary",
        type: "input",
        message: "What is the SALARY for the new role ? ",
        validate: function( value ) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter the SALARY ";
        },
        },
        {
        name: "department",
        type: "list",
        message: "What is the Department for the role ? ",
        choices: roleDepartment
        }])
        .then(function(answers) {

        let depId = getDeptID(answers.department, departmentsArray);
        var query = `INSERT INTO role(title, salary, department_id) VALUES(?,?,${depId})`;
            
        connection.query(query, [answers.title, answers.salary], function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Record INSERTED");
    
            cli();
        });
    });
}

//////////////////////////////////////// REMOVE Functions

// Function to REMOVE an employee 
async function removeEmployee() {
    inquirer
        .prompt([{
            name: "empFullName",
            type: "list",
            message: "Choose the EMPLOYEE you want to REMOVE ? ",
            choices: employeeFullName
        }
        ])
        .then(function(answers) {
            // Split the name to give in the where clause as in table its two different columns
            var splitName = answers.empFullName.split(" ");
            let query = `DELETE FROM employee WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " record DELETED");
                cli();
            });
        })
}

//////////////////////////////////////// Get IDs  Functions

// Function to UPDATE a specific EMPLOYEE
async function updateEmployeeDetails(){
    inquirer
    .prompt([{
        name: "empFullName",
        type: "list",
        message: "Choose the EMPLOYEE you want to UPDATE ? ",
        choices: employeeFullName,
    }
    ])

    .then(function(answers) {
        // Split name choosen to match with values in database 
        var splitName = answers.empFullName.split(" ");

        // IF choosen NONE ... do nothing 
        if(answers.empFullName === "NONE"){
            cli();
        }

        // ELSE prompt the options WHAT to update for the employee
        else{

            inquirer.prompt([
                {
                    name: "updateOption",
                    type: "list",
                    message: "What do you want to UPDATE for the employee ? ",
                    choices: ['UPDATE FIRST NAME','UPDATE LAST NAME','UPDATE ROLE','UPDATE MANAGER'],
                }
            ])

            .then(function(answers) {
                // Update FIRST NAME of choosen Employee
                if(answers.updateOption === "UPDATE FIRST NAME"){
                    inquirer.prompt({
                        name: "newFirstName",
                        message: `What is the NEW FIRST name for employee ? `,
                        type: "input",
                        validate: function(value){
                            var string = value.match(/^\s*\S+.*/);
                            if (string) {
                              return true;
                            } else {
                              return "Please enter the new FIRST NAME for the employee";
                            }
                          }
                    })
                    .then(function(answers2) {
                        let query = `UPDATE employee SET first_name='${answers2.newFirstName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            cli();
                        });
                    })
                }
                // Update LAST NAME of choosen Employee
                if(answers.updateOption === "UPDATE LAST NAME"){
                    inquirer.prompt({
                        name: "newLastName",
                        message: `What is the NEW LAST name for employee ? `,
                        type: "input",
                        validate: function(value){
                            var string = value.match(/^\s*\S+.*/);
                            if (string) {
                              return true;
                            } else {
                              return "Please enter the new LAST NAME";
                            }
                          }
                    })
                    .then(function(answers2) {
                        let query = `UPDATE employee SET last_name='${answers2.newLastName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            cli();
                        });
                    })
                }
                // Update ROLE of choosen Employee
                if(answers.updateOption === "UPDATE ROLE"){
                    inquirer.prompt({
                        name: "newRole",
                        message: `Choose the NEW ROLE for employee ? `,
                        type: "list",
                        choices: employeeRolesNames
                    })
                    .then(function(answers2) {
                        let roleId = getRoleID(answers2.newRole, rolesArray);
                        let query = `UPDATE employee SET role_id='${roleId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            cli();
                        });
                    })
                }
                // Update MANAGER of choosen Employee
                if(answers.updateOption === "UPDATE MANAGER"){
                    inquirer.prompt({
                        name: "newManager",
                        message: `Choose the NEW MANAGER for employee ? `,
                        type: "list",
                        choices: employeeFullName
                    })
                    .then(function(answers2) {
                        let manId = getManagerID(answers2.newManager, employeesArray);
                        let query = `UPDATE employee SET manager_id='${manId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            cli();
                        });
                    })
        
                }
    
            })

        }
        
    })
}


//////////////////////////////////////// View Budget Functions

// Function to view total BUDGET of the company grouped by department
async function viewBudget(){
    // Bringing updated values from a VIEW created in Database : TOTAL_BUDGET
    let query = `select department_name as DEPARTMENT_NAME, sum(salary) as TOTAL_BUDGET from employee_budget
    group by department_name ;`;
        connection.query(query, function(err, res) {
            if (err) throw err;
            printTable(res);
            cli();
        });

}

//////////////////////////////////////// get CHOICES Functions

// Function to create a JSON array of all ROLES
async function rolesJSON(){
        connection.query("SELECT id, title FROM role;", function (err, res) {
            res.forEach(function(row){
                rolesArray.push({id:row.id , title:row.title});
                employeeRolesNames.push(row.title);
            })
          if (err) throw err;
        });
}

// Function to create a JSON array of all EMPLOYEES
async function employeesJSON(){
    employeeFullName.push("NONE");

    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
        res.forEach(function(row){
            employeesArray.push({id:row.id , first_name:row.first_name, last_name:row.last_name});
            employeeFullName.push(row.first_name + " " + row.last_name);
        })
      if (err) throw err;
    });
}

// Function to create a JSON array of all DEPARTMENTS
async function departmentsJSON(){
    connection.query("SELECT id, name FROM department;", function (err, res) {
        res.forEach(function(row){
            roleDepartment.push(row.name);
            departmentsArray.push({id:row.id , name:row.name});
        })
      if (err) throw err;
    });
}


//////////////////////////////////////// Get IDs  Functions

// Function to get ROLE ID from choosen NAMES
function getRoleID(employeeRole, array){
    for (var i=0; i<array.length; i++) {
        if (array[i].title === employeeRole) {
            return array[i].id;
            }
        }
}

// Function to get MANAGER ID from choosen NAMES
function getManagerID(managerName, array){
    if (managerName === "NONE"){
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

// Function to get DEPARTMENT ID from choosen NAMES
function getDeptID(departmentName, array){
        for (var i=0; i<array.length; i++) {
            if (array[i].name === departmentName) {
                return array[i].id;
                }
            }
}


// EXPORT CLI FUNCTION
module.exports = cli;