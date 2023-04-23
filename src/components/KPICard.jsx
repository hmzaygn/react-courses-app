import React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { amber } from "@mui/material/colors";

const KPICard = ({ studentInfo }) => {
  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: "50rem" }} elevation={10}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: "4rem",
            height: "4rem",
            color: amber[900],
            backgroundColor: amber[200],
            my: "auto",
            mx: 2,
          }}
        >
          {/* {studentInfo?.first_name?.charAt(0) ? (
            <Typography sx={{ fontSize: "2.5rem" }}>
              {studentInfo?.first_name?.charAt(0).toUpperCase()}
            </Typography>
          ) : (
            <PersonIcon sx={{ fontSize: "2.5rem" }} />
          )} */}
        </Avatar>

        <Box sx={{ mx: 3 }}>
          <Typography variant="button">
            {studentInfo?.first_name || "NAME"}
          </Typography>
          <Typography variant="h5">
            {studentInfo?.last_name || "LAST NAME"}
          </Typography>
        </Box>

        <Box sx={{ mx: 3 }}>
          <Typography variant="h6">
            You have total
            <span style={{ color: "red" }}>
              {" "}
              {studentInfo ? studentInfo?.courses?.length : 0}{" "}
            </span>
            courses
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default KPICard;
