const express = require('express');
const { db, connectDB } = require('./db');  
const bodyParser = require('body-parser');
const app = express();
const cron = require('node-cron');

app.use(bodyParser.json());

const port = 3005;
 
connectDB();
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
            res.send('User not found');
        }
    } catch (err) {
        console.log('Error querying the database:', err);
     }
});



app.post('/user', async (req, res) => {
    const { username, email, password } = req.body;  

     if (!username || !email || !password) {
        return res.send('Missing fields');
    }

    try {
         const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );

         res.json(result.rows[0]);  
    } catch (err) {
        console.log('Error inserting user:', err);
     }
});


app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;  

    try {
         const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount > 0) {
             res.json({ message: 'User deleted successfully', user: result.rows[0] });
        } else {
             console.log('User not found');
        }
    } catch (err) {
        console.log('Error deleting user:', err);
     }
});



app.put('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);   
    const { username, email, password } = req.body; 

     if (!username || !email || !password) {
        return res.json({ error: 'All fields (username, email, password) are required' });
    }

    try {
         const result = await db.query(
            `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
            [username, email, password, id]   
        );

         if (result.rows.length === 0) {
            return res.json({ error: 'User not found' });
        }

         res.json({ user: result.rows[0] });
    } catch (err) {
        console.log('Error updating user:', err);  
        res .json({ error: 'Something went wrong, please try again' });   
    }
});

const server=app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
       db.end(()=>{
        console.log('PSQL closed.');
        process.exit(0);
       });

    });
  });
