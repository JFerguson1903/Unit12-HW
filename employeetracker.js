const mysql = require('mysql');

// the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'W@rmVa3i11a',
    database: 'boston',
});

const readEmployee_Role = () => {
    connection.query('SELECT name FROM Employee_Role', (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readEmployee_Role();
});