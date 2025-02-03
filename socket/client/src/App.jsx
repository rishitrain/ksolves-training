import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); 

function App() {
  const [userid, setId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setId(socket.id);
    });

    socket.on("get", (data) => {
      setMessages((prev) => [...prev, data]);  
    });

    return () => {
      socket.disconnect();  
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { user: userid, text: message };
      socket.emit("send", msgData);
      setMessage("");  
    }
  };

  return (
    <>
      <h1>User Connected</h1>
      <h2>{userid}</h2>

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h3>Chat Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.user}:</strong> {msg.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
