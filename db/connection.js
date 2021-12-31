const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    },
    console.log(' ...................................................................................................'),
    console.log("||||||||||||||||||||||||||||             WELCOME............             ||||||||||||||||||||||||||||"),
    console.log('||||||||||||||||||||||||||||             TO.................             ||||||||||||||||||||||||||||'),
    console.log('||||||||||||||||||||||||||||             YOUR...............             ||||||||||||||||||||||||||||'),
    console.log('||||||||||||||||||||||||||||             EMPLOYEE TRACKER...             ||||||||||||||||||||||||||||'),
    console.log(' ...................................................................................................')

);

module.exports = db;