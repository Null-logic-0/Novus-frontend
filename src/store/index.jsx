import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./UI-slice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, auth: authSlice.reducer },
});

export default store;
