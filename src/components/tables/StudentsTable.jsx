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
  const { student } = props;
  const { deleteStudent } = useCourseCalls();

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
          {student.id}
        </TableCell>
        <TableCell align="center">{student.first_name}</TableCell>
        <TableCell align="center">{student.last_name}</TableCell>
        {isAdmin ? (
          <TableCell align="center">
            <DeleteForeverIcon
              sx={iconSuperStyle}
              onClick={() => deleteStudent(student?.id)}
            />
          </TableCell>
        ) : (
          <TableCell align="center">
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
                      Student's Courses
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student?.courses?.length > 0 ? (
                    student?.courses?.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {course.course_name}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" sx={{ color: "red" }}>
                        This student taking no course yet
                      </TableCell>
                    </TableRow>
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

export default function StudentsTable({ students }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student No</TableCell>
            <TableCell align="center"> Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <Row key={student.id} student={student} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
