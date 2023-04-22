import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useCourseCalls from "../hooks/useCourseCalls";

const Home = () => {
  const { getAllCoursesStudentsData } = useCourseCalls();

  useEffect(() => {
    getAllCoursesStudentsData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="secondary" mb={4}>
        Dashboard
      </Typography>
      {/* <KpiCards /> */}
    </Box>
  );
};

export default Home;
