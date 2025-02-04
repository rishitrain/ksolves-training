const { Client } = require('pg');

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'usermanagement',
    password: 'password',
    port: 5432,
});

const connectDB = async () => {
    try {
        await db.connect();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = { db, connectDB };
