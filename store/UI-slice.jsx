import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { activeModal: null, showUsers: false, chatSideBar: true },
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
    showChatSidebar: (state) => {
      state.chatSideBar = true;
    },
    hideChatSidebar: (state) => {
      state.chatSideBar = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  showUsers,
  hideUsers,
  hideChatSidebar,
  showChatSidebar,
} = uiSlice.actions;

export default uiSlice;
