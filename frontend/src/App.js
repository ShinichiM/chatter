import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Chat, Auth, Header } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };
  return (
    <Router>
      <div>
        <p>Connected: {"" + isConnected}</p>
        <p>Last pong: {lastPong || "-"}</p>
        <button onClick={sendPing}>Send ping</button>
      </div>
      {/* TODO: Create Header Component for Page Navigation*/}
      <Routes>
        {/* TODO: Create Homepage Component*/}
        <Route path="/" element={<Home />} />
        {/* TODO: Create a message component */}
        <Route path="/messages" element={<Chat />} />
        {/* TODO: Create a Login Component */}
        <Route path="/login" element={<Auth />} />
      </Routes>
      <Header />
    </Router>
  );
}

export default App;
