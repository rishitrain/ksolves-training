const express=require('express');
const  database=require('./db');
const bodyParser = require('body-parser');

const app=express();

const port =3001;

app.use(bodyParser.json());


app.get('/',async (req,res)=>{

    try {
        const result = await database.query(`SELECT * FROM product`);
        res.json(result.rows);
    } catch (error) {
        res.send(error);
    }
 })


 app.get('/product/:id',async (req,res)=>{
    const id =req.params.id;

    try {
        const result = await database.query(`SELECT * FROM product WHERE id=$1`,[id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.send(error);
    }
 })

 app.post('/product',async (req,res)=>{

    const {name,price}=req.body;
     try {
             const result = await database.query(
                'INSERT INTO  product (name,price) VALUES ($1, $2) RETURNING *',
                [name, price]
            );
             res.status(201).json(result.rows[0]);  
        } catch (err) {
            console.error('Error inserting  product:', err);
         }
 })

 app.delete('/product/:id',async (req,res)=>{
         
    const id = req.params.id;

    try {

        const result = await database.query(
               ` DELETE FROM product WHERE id= $1`,[id],
        );

        res.json(result.rows[0])
        
    } catch (err) {
        console.error('Error deleting  product:', err);
    }
    }
 )



 app.put('/product/:id',async(req,res)=>{
     const id = req.params.id;

     const {name , price }=req.body;

     try {
        const result = await  database.query(`
       UPDATE product SET name = $1,price= $2 WHERE id = $3 RETURNING *`,
       [name , price ,id])
           res.json(result.rows[0]);
     } catch (error) {
        console.error('Error  putting   product:', error);

     }
 })


 app.patch('/product/:id',async(req,res)=>{
    const id = req.params.id;

    const {name , price }=req.body;

    try {
        let query='';
        let values=[];


        if (name&&price) {
            query=`UPDATE product SET name=$1 price=$2 WHERE id=$3 RETURNING *`;
            values=[name,price,id];
        } else if(name) {
            query=`UPDATE product SET name=$1  WHERE id=$2 RETURNING *`;
            values=[name,id];
        }
        else if(price) {
            query=`UPDATE product SET price=$1 WHERE id=$2 RETURNING *`;
            values=[price,id];
        }

        const data=await database.query(query,values);
        res.json(data.rows[0]);
    } catch (error) {
       console.error('Error patching  product:', error);

    }
})
  

app.listen(port,()=>{
    console.log("server started",`${port}`);
    
})