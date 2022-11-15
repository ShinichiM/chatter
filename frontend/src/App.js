import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Chat, Join } from "./components";
import Chat from "./components/Chat";
import Join from "./components/Join";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat location={window.location} />} />
      </Routes>
    </Router>
  );
};

export default App;
