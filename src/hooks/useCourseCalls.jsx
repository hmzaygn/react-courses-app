import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getAllCoursesStudentsSuccess,
  getSuccess,
} from "../features/courseSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

const useCourseCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getCoursesData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`api/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getCourses = () => getCoursesData("courses");
  const getStudents = () => getCoursesData("students-list");

  const getAllCoursesStudentsData = async () => {
    dispatch(fetchStart());
    try {
      const [courses, students] = await Promise.all([
        axiosWithToken.get("/api/courses/"),
        axiosWithToken.get("/api/students-list/"),
      ]);
      dispatch(getAllCoursesStudentsSuccess([courses.data, students.data]));
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  //!------------- DELETE CALLS ----------------
  const deleteCoursesData = async (url, id) => {
    try {
      await axiosWithToken.delete(`api/${url}/${id}/`);
      toastSuccessNotify(`Successfuly deleted`);
      getAllCoursesStudentsData();
    } catch (error) {
      console.log(error);
      toastErrorNotify(`Can not be deleted right now!!!`);
    }
  };

  const deleteCourse = (id) => deleteCoursesData("courses", id);
  const deleteStudent = (id) => deleteCoursesData("student-detail", id);

  //!------------- POST CALLS ----------------
  const postCoursesData = async (info, url) => {
    try {
      await axiosWithToken.post(`api/${url}/`, info);
      toastSuccessNotify(`Successfuly added`);
      getAllCoursesStudentsData();
    } catch (error) {
      console.log(error);
      toastErrorNotify(`Can not be added right now!!!`);
    }
  };

  const postCourse = (info) => postCoursesData(info, "courses");
  const postStudent = (info) => postCoursesData(info, "student-create");

  //!------------- PUT CALLS ----------------
  const putCoursesData = async (info, url) => {
    try {
      await axiosWithToken.put(`api/${url}/${info.id}/`, info);
      toastSuccessNotify(`Successfuly updated`);
      getAllCoursesStudentsData();
    } catch (error) {
      console.log(error);
      toastErrorNotify(`Can not be updated right now!!!`);
    }
  };

  const putCourse = (info) => putCoursesData(info, "courses");
  const putStudent = (info) => putCoursesData(info, "student-create");

  return {
    getCoursesData,
    getCourses,
    getStudents,
    getAllCoursesStudentsData,
    deleteCourse,
    deleteStudent,
    postCourse,
    postStudent,
    putCourse,
    putStudent,
  };
};

export default useCourseCalls;
