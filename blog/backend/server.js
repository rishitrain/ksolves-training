const express = require('express');
const app=express();
require('dotenv').config();  
const cors=require('cors') ;
const db=require('./db')
const authenticate =require('./middleware')


app.use(express.json());
app.use(cors());

 const  userroutes=require('./routes/userroutes')
 const blogroutes=require('./routes/blogroutes')
 const commentroute=require('./routes/commentroute')

 
 const port = 3000;

app.use('/',userroutes);
app.use('/login',userroutes);
app.use('/signup',userroutes);
app.use('/blogs',blogroutes);

app.use('/api',blogroutes);
app.use('/approved',blogroutes);
app.use('/wanttoapprove',blogroutes);
app.use('/display',blogroutes)
app.use('/delete',blogroutes)
app.use('/api/comments',commentroute)
  


app.get('/auth', authenticate, (req, res) => {
   res.json({ message: 'Protected route accessed successfully.' });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
