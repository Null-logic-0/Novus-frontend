import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../util/getCookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getCookie("token") || null,
  },
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      document.cookie = `token=${action.payload.token}`;
    },
    clearAuth(state) {
      state.token = null;
      document.cookie = "token=";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice;
