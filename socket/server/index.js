import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const port = 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", ({ mes, room }) => {
    if (room && mes) {
      io.to(room).emit("recieve", mes);
    }
  });

  socket.on("join-room", (room) => {
    if (room) {
      socket.join(room);
      console.log(`User joined room ${room}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});