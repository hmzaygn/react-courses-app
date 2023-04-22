import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { blueGrey, red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import useCourseCalls from "../../hooks/useCourseCalls";

const iconSuperStyle = {
  cursor: "pointer",
  transition: "all 0.5s",
  "& .MuiSvgIcon-root": { color: "#eee", transition: "all 0.5s" },
  "&:hover": { color: red[400] },
  "&:hover .MuiSvgIcon-root": { color: red[400] },
};

const iconStyle = {
  transition: "all 0.5s",
  color: blueGrey[400],
};

function Row(props) {
  const { isAdmin } = useSelector((state) => state.auth);
  const { course, setOpen, setInfo } = props;
  const { deleteCourse } = useCourseCalls();

  const [openRow, setOpenRow] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenRow(!openRow)}
          >
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {course.course_id}
        </TableCell>
        <TableCell align="center">{course.course_name}</TableCell>
        {isAdmin ? (
          <TableCell align="center">
            <EditIcon
              sx={iconSuperStyle}
              onClick={() => {
                setOpen(true);
                setInfo(course);
              }}
            />
            <DeleteForeverIcon
              sx={iconSuperStyle}
              onClick={() => deleteCourse(course?.id)}
            />
          </TableCell>
        ) : (
          <TableCell align="center">
            <EditIcon sx={iconStyle} />
            <DeleteForeverIcon sx={iconStyle} />
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Students Taking This Course
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {course.students?.length > 0 ? (
                    course.students?.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{student}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography align="center" sx={{ color: "red" }}>
                      There is no one taking this course yet
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CoursesTable({ courses, setInfo, setOpen }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Course ID</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <Row
              key={course.id}
              course={course}
              setOpen={setOpen}
              setInfo={setInfo}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
