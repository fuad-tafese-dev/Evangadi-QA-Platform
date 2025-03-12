const connection = require('./db/dbConfig');

async function testDB() {
    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Database connected! Test result:', rows[0].solution);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testDB();
