import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navigationbar from "./components/Navigationbar";
import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <React.Fragment>
      <Navigationbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route exact path="register" element={<Register />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
