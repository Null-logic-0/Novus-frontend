import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { activeModal: null, showUsers: false },
  reducers: {
    openModal(state, action) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },

    showUsers: (state) => {
      state.showUsers = true;
    },
    hideUsers: (state) => {
      state.showUsers = false;
    },
  },
});

export const { openModal, closeModal, showUsers, hideUsers } = uiSlice.actions;

export default uiSlice;
