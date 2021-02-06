/* Seeds for SQL table */
USE DMScrantonEmployeeTrackerDB;

/* Insert rows into your tables */
INSERT INTO Department (department_name)
VALUES ("Sales"), 
("Accounting"), 
("Warehouse"), 
("Quality Control"), 
("Supplier Relations"),
("Human Resources"), 
("Reception"),
("Customer Service");

INSERT INTO Employee_Role (title, salary, department_id)
VALUES ("Regional Manager", 45000, 1), 
("Asst to the Regional Manager", 55000, 1), 
("Sales Rep", 50000, 1),
("Senior Accountant", 45000, 2),
("Accountant", 38000, 2),
("Warehouse Foreman", 40000, 3),
("Warehouse", 32000, 3),
("Quality Assurance Rep", 31723, 4),
("Supplier Relations", 34000, 5),
("Human Resources", 31500, 6),
("Receptionist", 32000, 7),
("Customer Service Rep", 34000, 8);


INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, 0),
("Dwight", "Schrute", 2, 1),
("Jim", "Halpert", 3, 1),
("Andy", "Bernard", 3, 1),
("Phyllis", "Lapin", 3, 1),
("Stanley", "Hudson", 3, 1),
("Angela", "Martin", 4, 1),
("Kevin", "Malone", 5, 4),
("Oscar", "Martinez", 5, 4),
("Darryl", "Philbin", 6, 1),
("Jerry", "DiCanio", 7, 6),
("Madge", "Madsen", 7, 6),
("Lonnie", "Collins", 7, 6),
("Creed", "Bratton", 8, 1),
("Meredith", "Palmer", 9, 1),
("Toby", "Flenderson", 10, 0),
("Pam", "Beesly", 11, 1),
("Kelly", "Kapoor", 12, 1);


