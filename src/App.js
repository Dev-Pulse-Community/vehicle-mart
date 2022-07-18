import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navigationbar from "./components/Navigationbar";
import Home from "./views/Home";
import About from "./views/About";

function App() {
  return (
    <React.Fragment>
      <Navigationbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
