import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user;
      state.isAdmin = payload?.user?.is_superuser;
      state.token = payload?.key;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.isAdmin = false;
      state.token = null;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
      state.token = payload?.key;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
