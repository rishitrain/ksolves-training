const dbMySQL = require('./mysql');
const clientPostgres = require('./postgres');

dbMySQL.query('SELECT 1 + 1 AS solution', (err, result) => {
  if (err) {
    console.error('MySQL Error:', err.stack);
  } else {
    console.log('MySQL Query Result:', result);
  }
});

clientPostgres.query('SELECT $1::text as message', ['Hello from PostgreSQL'])
  .then((res) => {
    console.log('PostgreSQL Query Result:', res.rows[0].message);
  })
  .catch((err) => {
    console.error('PostgreSQL Error:', err.stack);
  });
