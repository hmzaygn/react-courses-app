import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import useAuthCalls from "../hooks/useAuthCalls";

const RegisterForm = () => {
  const { register } = useAuthCalls();
  const [registerInfo, setRegisterInfo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(registerInfo);
  };

  console.log(registerInfo);

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="User Name"
        name="username"
        id="userName"
        type="text"
        variant="outlined"
        value={registerInfo.username || ""}
        onChange={handleChange}
      />
      <TextField
        required
        label="First Name"
        name="first_name"
        id="firstName"
        type="text"
        variant="outlined"
        value={registerInfo.first_name || ""}
        onChange={handleChange}
      />
      <TextField
        required
        label="Last Name"
        name="last_name"
        id="lastName"
        type="text"
        variant="outlined"
        value={registerInfo.last_name || ""}
        onChange={handleChange}
      />
      <TextField
        required
        label="Email"
        name="email"
        id="email"
        type="email"
        variant="outlined"
        value={registerInfo.email || ""}
        onChange={handleChange}
      />
      <TextField
        required
        label="Password"
        name="password"
        id="password"
        type="password"
        variant="outlined"
        value={registerInfo.password || ""}
        onChange={handleChange}
      />
      <TextField
        required
        label="Password Again"
        name="password2"
        id="password2"
        type="password"
        variant="outlined"
        value={registerInfo.password2 || ""}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" endIcon={<FingerprintIcon />}>
        Login
      </Button>
    </Box>
  );
};

export default RegisterForm;
