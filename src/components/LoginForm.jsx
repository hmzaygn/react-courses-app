import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import useAuthCalls from "../hooks/useAuthCalls";

const LoginForm = () => {
  const { login } = useAuthCalls();
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginInfo);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        type="email"
        name="email"
        variant="outlined"
        label="Email"
        value={loginInfo.email || ""}
        onChange={handleChange}
      />
      <TextField
        required
        type="password"
        name="password"
        variant="outlined"
        label="Password"
        value={loginInfo.password || ""}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" endIcon={<FingerprintIcon />}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
