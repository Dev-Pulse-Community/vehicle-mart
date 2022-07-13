import logo from "./logo.svg";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          REACT FRONTEND
        </p>
         
      </header>
    </div>
  );
}

export default App;
