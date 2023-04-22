import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    courses: null,
    students: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    getAllCoursesStudentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.courses = payload[0];
      state.students = payload[1];
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccess,
  getAllCoursesStudentsSuccess,
  fetchFail,
} = courseSlice.actions;
export default courseSlice.reducer;
