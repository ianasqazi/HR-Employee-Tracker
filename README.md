# **HR-Employee-Tracker**
Companies often require an application to manage all employees working in a company. Human resources department uses applications like these to ADD/UPDATE/DELETE employees and their ROLES/DEPARTMENTS/SALARIES etc. This app was developed using NODE, INQUIRER and MySQL.

> AS A Human resources head in a company
>
> I WANT to INSERT/UPDATE/DELETE for employees , departments or roles in the company
>
> SO THAT I can maintain all departments and calculate budget etc.

![LOGO](/screenshots/logo_screenshot.png)

The application features the following features : 

1. View ALL Employees
2. View Employees by Manager
3. View Employees by Roles
4. View ALL Departments
5. View ALL Roles
6. ADD Employees
7. ADD Departments
8. ADD Roles
9. UPDATE Employees NAME/ROLE/MANAGER
10. REMOVE Employees
11. View BUDGET for ALL departments in company

## Repository 

Click the link below to check the repository :

[GitHub URL](https://github.com/ianasqazi/HR-Employee-Tracker)

## Preview

A working demo can be found at the following Youtube link. 

[Youtube](https://youtu.be/WIeUFYX6tzw)

## Requirements

For testing, you will need Node.js and node global package, and also the following dependency packages installed in your environement.  

### Node

 Just go on [official Node.js website](https://nodejs.org/) and download the installer.

Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).  

To check if its already installed just type the following commands to verify :

```bash
node --version
v12.6.0

git --version
git version 2.21.0 (Apple Git-122)

npm --version
6.13.1
```

### NPM Packages

- INQUIRER -- prompt CLI questions 
- MYSQL -- Database to INSERT/UPDATE/DELETE 
- ASCIIART-LOGO -- Intro Logo Headers
- CONSOLE-TABLE-PRINTER -- Table formatting in CLI

### Database Instance

The database for HR-EMPLOYEE-TRACKER is running on a free hosting website by **[freemysqlhosting.net](freemysqlhosting.net)**.

If the above hosting site is not working. Kindly run the attached script in the following order which can be found in the public/db/ folder

1. create_queries.sql
2. seed.sql

NOTE : Kindly update the connection link in /public/initialize.js file to the correct database.

## Running the Application

Run the following commands in your terminal window 

```bash
git clone https://github.com/ianasqazi/HR-Employee-Tracker.git

cd HR-Employee-Tracker

npm install
```

All packages will be installed and now run the application with the command below : 

```bash
node app.js
```
