 const express = require('express');
const mysql = require('mysql');

 const app = express();

 const db = mysql.createConnection({
  host: 'localhost',          
  user: 'root',               
  password: 'your_new_password',  
  database: 'db1'            
});

 db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ');
});
