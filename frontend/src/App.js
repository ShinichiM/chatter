import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Chat, Auth, Header } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
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
