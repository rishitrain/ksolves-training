const express=require("express")
const router=express.Router()
const bcrypt = require('bcryptjs');
const db=require('../db')
const jwt = require('jsonwebtoken');

router.get('/getblogs', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM blogt');   
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }

        res.json(result.rows);  // Return all blogs as an array
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});


router.post('/createblog',async (req,res)=>{
       
        const {blogname,blogcontent}=req.body;

        try {
             const result = await db.query(
        'INSERT INTO blogt (blog_name,blog_content) VALUES ($1,$2) RETURNING *',
        [blogname,blogcontent]);

        res.json(result.rows[0])
        } catch (error) {
            console.log("error creating blog")
        }
})


router.get('/approved', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM blogt WHERE isapproved = TRUE');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching approved blogs:', err);
      res.status(500).json({ message: 'Error fetching approved blogs' });
    }
  });
  
router.get('/pending', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM blogt WHERE isapproved = FALSE');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching pending blogs:', err);
      res.status(500).json({ message: 'Error fetching pending blogs' });
    }
  });


module.exports=router