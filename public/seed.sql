-- INSERT into 'DEPARTMENT' QUERIES 

select name from department;

INSERT INTO department (name) VALUES ('IT Department');
INSERT INTO department (name) VALUES ('Treasury Department');
INSERT INTO department (name) VALUES ('HR Department');
INSERT INTO department (name) VALUES ('Maintainance Department');
INSERT INTO department (name) VALUES ('Compliance Department');
INSERT INTO department (name) VALUES ('Kitchen');
INSERT INTO department (name) VALUES ('Procurement Department');

-- INSERT into 'EMPLOYEE' QUERIES 

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Edward','Apostal','1',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('John','Doe','5',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Vishal','Patel','1','2');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Ryan','Udugampula','1','2');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Sean','Gillespie','1','2');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('David','Gehtman','2',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Dmytro','Latysh','2',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Cristina','LSM','3',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('John','Doe','4',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Rosalva','Love','5','9');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Shaniqua','Welcher','6','15');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Pearle','Kerbs','6',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Pearline','Deras','7',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Roger','Lagarde','8',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Gerda','Ver','8','120');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Lynda','Boggs','5',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Merideth','Delao','2',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Selena','Gomes','2',NULL);
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Thomas','Edison','16','18');
INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('Brad','Pitt','17',NULL);

-- INSERT into 'ROLE' QUERIES 

INSERT INTO role(title, salary, department_id) VALUES ('IT HEAD','100000','1');
INSERT INTO role(title, salary, department_id) VALUES ('Developer','50000','1');
INSERT INTO role(title, salary, department_id) VALUES ('Treasury Head','80000','2');
INSERT INTO role(title, salary, department_id) VALUES ('HR Head','120000','3');
INSERT INTO role(title, salary, department_id) VALUES ('HR Assistant','40000','3');
INSERT INTO role(title, salary, department_id) VALUES ('Helper','25000','4');
INSERT INTO role(title, salary, department_id) VALUES ('Cleaner','25000','4');
INSERT INTO role(title, salary, department_id) VALUES ('Complaince Head','30000','5');
INSERT INTO role(title, salary, department_id) VALUES ('Cook','35000','6');
INSERT INTO role(title, salary, department_id) VALUES ('Procurement Manager','65000','7');
