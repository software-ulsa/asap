import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  openCreate: false,
  openEdit: false,
  stepsNumber: 0,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpenCreate: (state) => {
      state.openCreate = true;
    },
    handleOpenEdit: (state) => {
      state.openEdit = true;
    },
    handleClose: (state) => {
      state.openCreate = false;
      state.openEdit = false;
    },
    handleNext: (state) => {
      if (state.activeStep < state.stepsNumber - 1) {
        state.activeStep += 1;
      }
    },
    handleBack: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
    rebootActiveStep: (state) => {
      state.activeStep = 0;
    },
    setStepSize: (state, action) => {
      state.stepsNumber = action.payload;
    },
  },
});

export const {
  handleOpenCreate,
  handleOpenEdit,
  handleClose,
  handleNext,
  handleBack,
  setStepSize,
  rebootActiveStep,
} = modalSlice.actions;
export default modalSlice.reducer;
