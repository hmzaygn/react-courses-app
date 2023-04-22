import React from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useCourseCalls from "../../hooks/useCourseCalls";

export default function CoursesModal({ open, setOpen, info, setInfo }) {
  const { postCourse, putCourse } = useCourseCalls();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      putCourse(info);
    } else {
      postCourse(info);
    }
    setInfo({});
  };

  console.log(info);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setInfo({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Course ID"
            name="course_id"
            id="course_id"
            type="text"
            variant="outlined"
            value={info?.course_id || ""}
            onChange={handleChange}
            required
            helperText={
              info?.course_id &&
              info?.course_id?.length > 6 &&
              "Must have max 6 characters"
            }
            error={
              info?.course_id && info?.course_id?.length > 6 ? true : false
            }
          />
          <TextField
            margin="dense"
            label="Course Name"
            name="course_name"
            id="course_name"
            type="text"
            variant="outlined"
            value={info?.course_name || ""}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update Course" : "Add New Course"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
