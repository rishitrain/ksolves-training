const express=require("express")
const router=express.Router()
const bcrypt = require('bcryptjs');
const db=require('../db')
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
         const result = await db.query('SELECT * FROM users');
        res.json(result.rows);  
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials 1' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
     
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user.id, isadmin: user.isadmin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Login successful', token });
  
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  


router.post('/user/signup', async (req, res) => {
    const { username,email,password } = req.body;
     let {isadmin}=req.body;
    isadmin=false;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (username,email,password,isadmin) VALUES ($1,$2,$3,$4) RETURNING *',
            [username,email,hashedPassword,isadmin]
        );

        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});



module.exports=router