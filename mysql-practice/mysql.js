const mysql = require('mysql');

const dbMySQL = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_new_password',
  database: 'db1',
});

dbMySQL.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + dbMySQL.threadId);
});

module.exports = dbMySQL;
