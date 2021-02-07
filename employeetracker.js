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

// Add DB Info
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "newDepartment",
        message: "Department Name?",
    }).then(function(data) {
        console.log(data.newDepartment);

        connection.query('SELECT * FROM Department', (err, res) => {
            if (err) throw err;

            console.log("Update DB Here");
            whatToDo();
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