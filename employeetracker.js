const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

// Prints ASCII Banner
const loadBanner = () => {
    figlet.text('scranton employee tracker', {
        font: 'Roman',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 90,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}

// the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'W@rmVa3i11a',
    database: 'DMScrantonEmployeeTrackerDB',
});

// View Department DB Info
const viewData = (dbTable) => {
    connection.query(`SELECT * FROM ${dbTable}`, (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        whatToDo();
    });
}

// View Employee_Role DB filtered Info
const viewRoles = () => {
    connection.query(`SELECT employee_role.id, employee_role.title, employee_role.salary, department.department_name 
    FROM department INNER JOIN employee_role ON department.id=employee_role.department_id`, (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        whatToDo();
    });
}

// View Employee DB filtered Info
const viewEmployees = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee.manager_id 
    FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id`, (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        whatToDo();
    });
}


// Callback Function for Returning Departments from DB
const returnDepartments = (callback) => {
    connection.query('SELECT id, department_name FROM Department', (err, res) => {
        if (err) throw err;

        let departments = [];
        res.forEach(myFunction);

        function myFunction(item, index) {
            let departmentOptions = { value: item.id, name: item.department_name };
            departments.push(departmentOptions);
        }

        return callback(departments);
    });
};

// Callback Function for Returning Employee_Role from DB
const returnEmployeeRoles = (callback) => {
    connection.query('SELECT id, title FROM Employee_Role', (err, res) => {
        if (err) throw err;

        let roles = [];
        res.forEach(myFunction);

        function myFunction(item, index) {
            let roleOptions = { value: item.id, name: item.title };
            roles.push(roleOptions);
        }

        return callback(roles);
    });
};

// Callback Function for Returning Employees from DB
const returnEmployees = (callback) => {
    connection.query('SELECT id, first_name, last_name FROM Employee', (err, res) => {
        if (err) throw err;

        let employeeName = [];
        res.forEach(myFunction);

        function myFunction(item, index) {
            let employeeNameOptions = { value: item.id, name: `${item.first_name} ${item.last_name}` };
            employeeName.push(employeeNameOptions);
        }

        return callback(employeeName);
    });
};

// Add new department to DB
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "newDepartment",
        message: "Department Name?",
    }).then(function(data) {
        console.log(data.newDepartment);

        connection.query(`INSERT INTO Department (department_name) VALUES ("${data.newDepartment}")`, (err, res) => {
            if (err) throw err;
            console.log(`${data.newDepartment} has been added!`);
            whatToDo();
        });
    });
};

// Add new role to DB
const addRole = () => {

    returnDepartments(function(result) {

        inquirer.prompt([{
            type: "input",
            name: "newRoleTitle",
            message: "What is the title of the new role?",
        }, {
            type: "input",
            name: "newRoleSalary",
            message: "What is the salary of the new role?",
        }, {
            type: "list",
            name: "newRoleDepartment",
            message: "What department does the role belong to?",
            choices: result
        }]).then(function(data) {
            connection.query(`INSERT INTO Employee_Role (title, salary, department_id) VALUES ("${data.newRoleTitle}", ${data.newRoleSalary}, ${data.newRoleDepartment})`, (err, res) => {
                if (err) throw err;
                console.log(`${data.newRoleTitle} has been added!`);
                whatToDo();
            });
        });
    });
};

// Add new employee to DB
const addEmployee = () => {

    returnEmployeeRoles(function(result) {

        inquirer.prompt([{
            type: "input",
            name: "newEmployeeFirstName",
            message: "What is the new employees first name?",
        }, {
            type: "input",
            name: "newEmployeeLastName",
            message: "What is the new employees Last name?",
        }, {
            type: "list",
            name: "newEmployeeRole",
            message: "What role will the new employee be in?",
            choices: result
        }, {
            type: "list",
            name: "newEmployeeManager",
            message: "What role will the new employee report to?",
            choices: result
        }]).then(function(data) {
            connection.query(`INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ("${data.newEmployeeFirstName}", "${data.newEmployeeLastName}", ${data.newEmployeeRole}, ${data.newEmployeeManager})`, (err, res) => {
                if (err) throw err;
                console.log(`${data.newEmployeeFirstName} ${data.newEmployeeLastName} has been added!`);
                whatToDo();
            });
        });
    });
};

// Change an employees role
const changeRole = () => {

    returnEmployees(function(result) {

        inquirer.prompt([{
            type: "list",
            name: "updateEmployeeName",
            message: "Who do you need to update?",
            choices: result
        }]).then(function(data) {

            let employeeToBeUpdated = data.updateEmployeeName;
            returnEmployeeRoles(function(result) {

                inquirer.prompt([{
                    type: "list",
                    name: "updatedEmployeeRole",
                    message: "What is the employees updated role?",
                    choices: result
                }]).then(function(data) {
                    console.log(employeeToBeUpdated);
                    connection.query(`UPDATE Employee SET role_id = ${data.updatedEmployeeRole} WHERE id = ${employeeToBeUpdated}`, (err, res) => {
                        if (err) throw err;
                        console.log(`Your employee has been updated!`);
                        whatToDo();
                    });

                });
            });

        });
    });
};

const whatToDo = () => {
    inquirer.prompt({
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Change an Employees Role",
            "Quit"
        ]
    }).then(function(data) {
        console.log(data.todo);

        switch (data.todo) {
            case 'View All Departments':
                viewData('Department');
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Change an Employees Role':
                changeRole();
                break;
            case 'Quit':
                connection.end();
                process.exit();
        }
    });
}

//loadBanner();
whatToDo();

connection.connect((err) => {
    if (err) throw err;
    //console.log(`connected as id ${connection.threadId}\n`);
});