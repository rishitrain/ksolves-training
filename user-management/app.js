const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/', async (req, res) => {
    try {
         const result = await db.query('SELECT * FROM users');
        res.json(result.rows);  
    } catch (err) {
        console.error('Error querying the database:', err);
     }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;  
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);  
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error querying the database:', err);
     }
});



app.post('/user', async (req, res) => {
    const { username, email, password } = req.body;  

     if (!username || !email || !password) {
        return res.status(400).send('Missing fields');
    }

    try {
         const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );

         res.status(201).json(result.rows[0]);  
    } catch (err) {
        console.error('Error inserting user:', err);
     }
});


app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;  

    try {
         const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount > 0) {
             res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
        } else {
             console.log('User not found');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
     }
});
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
