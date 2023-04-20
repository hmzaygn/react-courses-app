import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { Outlet } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";

const Dashboard = () => {
  const { logout } = useAuthCalls();

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              COURSES APP
            </Typography>
            <Button color="inherit" onClick={() => logout()}>
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </Box>
  );
};

export default Dashboard;
