/* Schema for SQL database/table */
DROP DATABASE IF EXISTS DMScrantonEmployeeTrackerDB;
CREATE database DMScrantonEmployeeTrackerDB;

/* Create database */
USE DMScrantonEmployeeTrackerDB;

/* Create new table for department */
CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

/* Create new table for employee_role */
CREATE TABLE Employee_Role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(7,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

/* Create new table for employee */
CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM Department;
SELECT * FROM Employee_Role;
SELECT * FROM Employee;
