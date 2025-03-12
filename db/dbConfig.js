require('dotenv').config();
const mysql2 = require('mysql2');

const connection = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 10,
});

module.exports = connection.promise();
