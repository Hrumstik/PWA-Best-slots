import { createSlice } from "@reduxjs/toolkit";

export interface InstalState {
  isInstalling: boolean;
  fakeInstall: boolean;
  isInstalled: boolean;
  installProgress: string;
}

const initialState: InstalState = {
  isInstalling: false,
  fakeInstall: false,
  isInstalled: false,
  installProgress: "Waiting...",
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
    setIsInstalled: (state) => {
      state.isInstalled = true;
    },
    setInstallProgress: (state, action) => {
      state.installProgress = action.payload + "% of 15 MB";
    },
  },
});

export const {
  install,
  stopInstalling,
  startFakeInstall,
  stopFakeInstall,
  setIsInstalled,
  setInstallProgress,
} = instalSlice.actions;

export default instalSlice.reducer;
