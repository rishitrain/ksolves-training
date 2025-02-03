import express from  'express';
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors'

const app = express();

const port =3000;

const server =createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});


app.use(cors());

io.on("connection",(socket)=>{
console.log(socket.id);
console.log("user connected");
 
socket.on("send",(data)=>{
    socket.broadcast.emit("get",data);
})
})



 

server.listen(port,()=>{

  console.log(`connected ${port}`)
})