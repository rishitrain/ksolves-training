const { Client } = require('pg');

const clientPostgres = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'dbname',
  password: 'password',
  port: 5432,
});

clientPostgres.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!');
  })
  .catch((err) => {
    console.error('Connection Error: ', err.stack);
  });

module.exports = clientPostgres;
