import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";
import loginImage from "../assets/login.png";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            COURSES APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>

          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Box>
            <LoginForm />
          </Box>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Don't have an account? Register Here!</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={loginImage} alt="img" width={"100%"} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
