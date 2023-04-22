import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useCourseCalls from "../hooks/useCourseCalls";
import { useSelector } from "react-redux";
import CoursesTable from "../components/tables/CoursesTable";

const Courses = () => {
  const { getAllCoursesStudentsData } = useCourseCalls();
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    getAllCoursesStudentsData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="secondary" mb={4}>
        Courses
      </Typography>

      <Button variant="contained">Add New Course</Button>

      {courses?.length > 0 && <CoursesTable courses={courses} />}
    </Box>
  );
};

export default Courses;
