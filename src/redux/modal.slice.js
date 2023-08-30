import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  registered: JSON.parse(localStorage.getItem("Registered")) ?? false,
  counterFull: JSON.parse(localStorage.getItem("CounterFull")) ?? false,
  listRegistered: JSON.parse(localStorage.getItem("listRegistered")) ?? [],
  download: false,
  data: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    hideModal: (state, action) => {
      state.open = false;
      state.download = false;
      state.data = null;
    },
    downloadBrochure: (state, action) => {
      state.download = true;
    },
    register: (state, action) => {
      let newRegister = {
        email: action.payload.email,
        phoneNo: action.payload.phoneNo,
      };
      state.listRegistered.push(newRegister);
      localStorage.setItem(
        "listRegistered",
        JSON.stringify(state.listRegistered)
      );
      state.registered = true;
      localStorage.setItem("Registered", true);
      state.download = false;
    },
    counterIsFull: (state, action) => {
      state.counterFull = true;
      localStorage.setItem("CounterFull", true);
    },
    counterIsNotFull: (state, action) => {
      state.counterFull = false;
      localStorage.setItem("CounterFull", false);
    },
  },
});

export const {
  showModal,
  hideModal,
  register,
  counterIsFull,
  counterIsNotFull,
  downloadBrochure,
} = modalSlice.actions;
export const selectModal = (state) => state.modal;
export const selectState = (state) => state.modal.open;
export const selectRegisterState = (state) => state.modal.registered;
export const selectListRegisterState = (state) => state.modal.listRegistered;
export const selectDownloadState = (state) => state.modal.download;
export const selectCounterState = (state) => state.modal.counterFull;
export const selectModalData = (state) => state.modal.data;

export default modalSlice.reducer;
