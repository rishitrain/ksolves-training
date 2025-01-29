const express = require('express');
const app=express();
require('dotenv').config();  
const cors=require('cors') ;
const db=require('./db')
const authenticate =require('./middleware')


app.use(express.json());
app.use(cors());

const loginroute=require('./routes/userroutes')
const  signuproute=require('./routes/userroutes')
const  homeroute=require('./routes/userroutes')
const blogfetch=require('./routes/blogroutes')
const pendingblog=require('./routes/blogroutes')
const approvedblog=require('./routes/blogroutes')
const wantoapprov=require('./routes/blogroutes')



const port = 3001;

app.use('/',homeroute);
app.use('/login',loginroute);
app.use('/signup',signuproute);
app.use('/blogs',blogfetch);
app.use('/api',pendingblog);
app.use('/approved',approvedblog);
app.use('/wanttoapprove',wantoapprov);

 


app.get('/auth', authenticate, (req, res) => {
   res.json({ message: 'Protected route accessed successfully.' });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
