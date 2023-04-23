import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StudentsTable from "../components/tables/StudentsTable";
import { useSelector } from "react-redux";
import useCourseCalls from "../hooks/useCourseCalls";

const Students = () => {
  const { students } = useSelector((state) => state.course);
  const { getAllCoursesStudentsData } = useCourseCalls();

  useEffect(() => {
    getAllCoursesStudentsData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="secondary" mb={4}>
        Students
      </Typography>

      {students && <StudentsTable students={students} />}
    </Box>
  );
};

export default Students;
