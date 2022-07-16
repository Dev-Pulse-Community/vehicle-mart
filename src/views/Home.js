import React from "react";
import logo from "../logo.svg";
import {  Box } from "@mui/material";
export default function Home() {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }} className="App-header" >
        <img src={logo} className="App-logo" alt="logo" />
        <h1> REACT HOME PAGE</h1>
      </Box>
    </React.Fragment>
  );
}
