const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
var figlet = require('figlet');

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

const readEmployee_Role = () => {
    connection.query('SELECT title FROM Employee_Role', (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

loadBanner();

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readEmployee_Role();
});