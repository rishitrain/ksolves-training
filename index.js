 const express = require('express');
const mysql = require('mysql');

 const app = express();

 const db = mysql.createConnection({
  host: 'localhost',         // Your MySQL server host
  user: 'root',              // MySQL username
  password: 'your_new_password', // MySQL password
  database: 'db1'            // Database name
});

// Establish the connection to MySQL
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

// Sample route to query the MySQL database
app.get('/users', (req, res) => {
  // Query to get users (assuming you have a `users` table in your db)
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results); // Send the results as a JSON response
  });
});

// Set the server to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
