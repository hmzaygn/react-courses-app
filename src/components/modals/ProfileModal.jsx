import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useCourseCalls from "../../hooks/useCourseCalls";
import { useSelector } from "react-redux";
import { flexColumn, modalStyle } from "../../styles/globalStyle";

export default function ProfileModal({
  open,
  setOpen,
  studentInfo,
  studentInfoForUpdate,
  setStudentInfoForUpdate,
}) {
  const navigate = useNavigate();
  const { putStudent } = useCourseCalls();
  const { courses } = useSelector((state) => state.course);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStudentInfoForUpdate({ ...studentInfoForUpdate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putStudent(studentInfoForUpdate);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel variant="outlined" id="product-select-label">
              Courses
            </InputLabel>
            <Select
              multiple
              labelId="product-select-label"
              label="Product"
              id="product-select"
              name="courses"
              value={studentInfoForUpdate?.courses || []}
              onChange={handleChange}
            >
              <MenuItem onClick={() => navigate("/stock/products")}>
                Add Course
              </MenuItem>
              <hr />
              {courses?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.course_id} - {item.course_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="First Name"
            id="first_name"
            name="first_name"
            type="text"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={studentInfoForUpdate?.first_name || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            id="last_name"
            type="text"
            variant="outlined"
            name="last_name"
            InputProps={{ inputProps: { min: 0 } }}
            value={studentInfoForUpdate?.last_name || ""}
            onChange={handleChange}
            required
          />
          <Typography variant="h6">My Courses</Typography>
          {studentInfo?.courses?.map((item) => (
            <Typography key={item.id}>{item.course_name || ""}</Typography>
          ))}

          <Button type="submit" variant="contained" size="large">
            Update My Profile
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
