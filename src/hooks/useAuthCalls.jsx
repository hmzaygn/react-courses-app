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

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/";

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

  return {
    login,
    register,
  };
};

export default useAuthCalls;
