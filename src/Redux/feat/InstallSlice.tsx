import { createSlice } from "@reduxjs/toolkit";

export interface InstalState {
  isInstalling: boolean;
  fakeInstall: boolean;
}

const initialState: InstalState = {
  isInstalling: false,
  fakeInstall: false,
};

export const instalSlice = createSlice({
  name: "install",
  initialState,
  reducers: {
    install: (state) => {
      state.isInstalling = true;
    },
    startFakeInstall: (state) => {
      state.fakeInstall = true;
    },
    stopFakeInstall: (state) => {
      state.fakeInstall = false;
    },
    stopInstalling: (state) => {
      state.isInstalling = false;
    },
  },
});

export const { install, stopInstalling, startFakeInstall, stopFakeInstall } =
  instalSlice.actions;

export default instalSlice.reducer;
