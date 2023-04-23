import { useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "../features/authSlice";

import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import useAxios from "./useAxios";

const useAuthCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "https://aygnhmz.pythonanywhere.com/";

  const login = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/auth/login/`, info);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/courses");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Login can not be performed");
    }
  };

  const register = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/register/`, info);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/courses");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${BASE_URL}users/auth/logout/`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  return {
    login,
    register,
    logout,
  };
};

export default useAuthCalls;
