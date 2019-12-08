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
desc employee;

select * from employee;

select * from role;


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
VALUES ("Pearline", "Deras", "7");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Roger", "Lagarde", "8");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Gerda", "Ver", "8");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Lynda", "Boggs", "5");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Merideth", "Delao", "2");
INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Kimbra", "Delao", "3");


