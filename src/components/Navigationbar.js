import * as React from "react";
import logo from "../logo.svg";
import {
  Avatar,
  AppBar,
  Box,
  Menu,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link, NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function ButtonAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = [
    {
      url: "/",
      title: "HOME",
    },
    {
      url: "/about",
      title: "ABOUT US",
    },
    {
      url: "/vehicles",
      title: "VEHICLES",
    },
    {
      url: "/contactus",
      title: "CONTACT US",
    },
    {
      url: "/register",
      title: "REGISTER",
    },
  ];
  const trigger = useScrollTrigger();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const CartIconRender = ({ viewType }) => {
    return (
      <IconButton
        size="small"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{
          mr: 0,
          display: {
            sx: viewType === "mobile" ? "none" : "flex",
            md: viewType === "desktop" ? "flex" : "none",
          },
        }}
      >
        <LocalMallIcon />
      </IconButton>
    );
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar
        //  position="sticky"
        position="fixed"
        elevation={trigger ? 24 : 0}
        style={{
          backgroundColor: trigger ? "transparent" : "#0A1929",
          backdropFilter: trigger && "blur(10px)",
        }}
      >
        <Toolbar>
          {/* FOR MOBILE */}
          <React.Fragment>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sx: "flex", md: "none" } }}
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            {/* MENU DROPDOWN FOR MOBILE */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none" }}
                    as={NavLink}
                    to={page.url}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{ display: { xs: "none", md: "flex" } }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VEHICLE POS INV
          </Typography>

          {/* FOR DESKTOP */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                component={Link}
                to={page.url}
              >
                {page.title}
              </Button>
            ))}
            <CartIconRender viewType="desktop" />
          </Box>

          {/* CART ICON FOR MOBILE */}
          <CartIconRender viewType="mobile" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
