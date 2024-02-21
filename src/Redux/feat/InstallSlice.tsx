import { createSlice } from "@reduxjs/toolkit";

export interface InstalState {
  isInstalling: boolean;
}

const initialState: InstalState = {
  isInstalling: false,
};

export const instalSlice = createSlice({
  name: "install",
  initialState,
  reducers: {
    install: (state) => {
      state.isInstalling = true;
    },
    stopInstalling: (state) => {
      state.isInstalling = false;
    },
  },
});

export const { install, stopInstalling } = instalSlice.actions;

export default instalSlice.reducer;
