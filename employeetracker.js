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

// View DB Info
const viewData = (dbTable) => {
    connection.query(`SELECT * FROM ${dbTable}`, (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        whatToDo();
    });
}

// Callback Function for Returning Departments
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
            "Quit"
        ]
    }).then(function(data) {
        console.log(data.todo);

        switch (data.todo) {
            case 'View All Departments':
                viewData('Department');
                break;
            case 'View All Roles':
                viewData('Employee_Role');
                break;
            case 'View All Employees':
                viewData('Employee');
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