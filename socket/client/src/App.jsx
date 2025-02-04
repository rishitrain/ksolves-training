import React, { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const [mes, setMes] = useState('');
  const [room, setRoom] = useState('');
  const [join, setJoin] = useState('');
  const [socketId, setSocketId] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mes && room) {
      socket.emit("message", { mes, room });
      setMes('');
    }
  };

  const handleRoom = (e) => {
    e.preventDefault();
    if (join) {
      socket.emit("join-room", join);
      setJoin('');
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("user connected", `${socket.id}`);
    });

    socket.on("recieve", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <h1>{socketId}</h1>

      <form onSubmit={handleRoom}>
        <input
          type='text'
          value={join}
          placeholder='join'
          onChange={(e) => setJoin(e.target.value)}
        />
        <button>join room</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={room}
          placeholder='room'
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type='text'
          value={mes}
          placeholder='message'
          onChange={(e) => setMes(e.target.value)}
        />
        <button>send</button>
      </form>

      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </>
  );
}

export default App;