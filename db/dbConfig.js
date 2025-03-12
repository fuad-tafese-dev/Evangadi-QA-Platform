require('dotenv').config();
const mysql2 = require('mysql2');

const connection = mysql2.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
});

module.exports = connection.promise();
