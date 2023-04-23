import React, { useEffect, useState } from "react";
import useCourseCalls from "../hooks/useCourseCalls";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import KPICard from "../components/KPICard";
import ProfileModal from "../components/modals/ProfileModal";
import ProfileTable from "../components/tables/ProfileTable";

const Home = () => {
  const { getAllCoursesStudentsData, getStudentDetail } = useCourseCalls();
  const { students } = useSelector((state) => state.course);
  const { currentUser } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState(() => {
    // get studentInfo from localStorage if available
    const storedStudentInfo = localStorage.getItem("studentInfo");
    if (storedStudentInfo) {
      return JSON.parse(storedStudentInfo);
    }
    // get studentInfo from students array
    const student = students?.find((item) => item.id === currentUser.id);
    return student ?? null;
  });

  const [studentInfoForUpdate, setStudentInfoForUpdate] = useState("");

  // update studentInfo when students array changes
  useEffect(() => {
    if (students) {
      const student = students?.find((item) => item.id === currentUser.id);
      setStudentInfo(student ?? null);
    }
  }, [students, currentUser]);

  // save studentInfo to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
  }, [studentInfo]);

  useEffect(() => {
    getAllCoursesStudentsData();
    getStudentDetail(currentUser?.id, setStudentInfoForUpdate);
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="secondary" mb={4}>
        My Profile
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Update My Profile
      </Button>

      <ProfileModal
        studentInfo={studentInfo}
        studentInfoForUpdate={studentInfoForUpdate}
        setStudentInfoForUpdate={setStudentInfoForUpdate}
        open={open}
        setOpen={() => setOpen(false)}
      />

      <KPICard studentInfo={studentInfo} />

      <ProfileTable studentInfo={studentInfo} />
    </Box>
  );
};

export default Home;
