INSERT INTO department (name)
VALUES ("IT Department");

INSERT INTO department (name)
VALUES ("Treasury Department");

INSERT INTO department (name)
VALUES ("HR Department");

INSERT INTO department (name)
VALUES ("Maintainance Department");

INSERT INTO department (name)
VALUES ("Compliance Department");

select * from department;

--------------------------- 
describe role;

select * from role;

INSERT INTO role(title, salary, department_id)
VALUES ("IT HEAD","100000","1");
INSERT INTO role(title, salary, department_id)
VALUES ("Developer","50000","1");

INSERT INTO role(title, salary, department_id)
VALUES ("Treasury Head","80000","2");

INSERT INTO role(title, salary, department_id)
VALUES ("HR Head","120000","3");
INSERT INTO role(title, salary, department_id)
VALUES ("HR Assistant","40000","3");

INSERT INTO role(title, salary, department_id)
VALUES ("Helper","25000","4");
INSERT INTO role(title, salary, department_id)
VALUES ("Cleaner","25000","4");

INSERT INTO role(title, salary, department_id)
VALUES ("Complaince Head","30000","5");


INSERT INTO role(title, salary, department_id)
VALUES ("","","");
INSERT INTO role(title, salary, department_id)
VALUES ("","","");

----------------------------


INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Edward", "Apostal", "1");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Vishal", "Patel", "1");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Ryan", "Udugampula", "1");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Sean", "Gillespie", "1");

INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Anas", "Qazi", "2");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("David", "Gehtman", "2");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Dmytro", "Latysh", "2");


INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Cristina", "LSM", "3");

-------------------------------------
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("John", "Doe", "4");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Rosalva", "Love", "5");


INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Shaniqua", "Welcher", "6");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Pearle", "Kerbs", "6");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Pearline", "Deras", "7","1");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Roger", "Lagarde", "8","3");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Gerda", "Ver", "8","1");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Lynda", "Boggs", "5","4");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Merideth", "Delao", "2","1");

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Kimbra", "Delao", "3","1");

----------

select * from employee;

select * from role;

select * from department;


SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", 
r.title AS "Role", d.name AS "Department", r.salary AS "Salary", 
(select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "Manager"
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id = d.id;
