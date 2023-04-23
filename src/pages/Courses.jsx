import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import CoursesTable from "../components/tables/CoursesTable";
import CoursesModal from "../components/modals/CoursesModal";
import useCourseCalls from "../hooks/useCourseCalls";

const Courses = () => {
  const { courses } = useSelector((state) => state.course);
  const { getAllCoursesStudentsData } = useCourseCalls();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getAllCoursesStudentsData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="secondary" mb={4}>
        Courses
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New Course
      </Button>

      <CoursesModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {courses?.length > 0 && (
        <CoursesTable courses={courses} setOpen={setOpen} setInfo={setInfo} />
      )}
    </Box>
  );
};

export default Courses;
