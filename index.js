 const express = require('express');
const mysql = require('mysql');

 const app = express();

 const db = mysql.createConnection({
  host: 'localhost',         // Your MySQL server host
  user: 'root',              // MySQL username
  password: 'your_new_password', // MySQL password
  database: 'db1'            // Database name
});

 db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

 app.get('/', (req, res) => {
  res.send('Hello, world!');
});

 app.get('/users', (req, res) => {
   db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);  
  });
});

 app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
