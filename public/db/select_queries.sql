-- SELECT QUERIES

select * from employee;
select * from role;
select * from department;

SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", 
r.title AS "Role", d.name AS "Department", r.salary AS "Salary", 
(select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "Manager"
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id = d.id;

CREATE VIEW employee_budget AS
SELECT d.name AS "department_name", 
r.salary AS "salary"
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id = d.id;

select department_name, sum(salary) from employee_budget
group by department_name ;
