const bcrypt = require('bcrypt');
const { Pool } = require('pg'); // Assuming you're using pg for PostgreSQL

// Database connection setup (update with your own database details)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'password',
  port: 5432,
});

// Password to hash (this is the plaintext password you want to hash)
const plaintextPassword = 'pass'; // The password you want to hash

// Function to hash password and update the database
async function hashAndUpdatePassword() {
  try {
    // Hash the plaintext password
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10); // 10 is the salt rounds

    console.log('Hashed password:', hashedPassword);

    // Update the password in the database
    const res = await pool.query('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, 'adminuser']); // Update for the 'admin' user

    console.log('Password updated successfully for admin user');
    pool.end();
  } catch (error) {
    console.error('Error:', error);
    pool.end();
  }
}

// Run the function to hash and update the password
hashAndUpdatePassword();
