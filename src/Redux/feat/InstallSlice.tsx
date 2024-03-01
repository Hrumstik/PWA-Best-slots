import { createSlice } from "@reduxjs/toolkit";

export interface InstalState {
  isInstalling: boolean;
  fakeInstall: boolean;
  isDownloaded: boolean;
  installProgress: string;
}

const initialState: InstalState = {
  isInstalling: false,
  fakeInstall: false,
  isDownloaded: false,
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
    setIsDownloaded: (state) => {
      state.isDownloaded = true;
    },
    setInstallProgress: (state, action) => {
      state.installProgress = action.payload + "% of 15 MB";
    },
    setInstallProgressIsPending: (state) => {
      state.installProgress = "Pending...";
    },
  },
});

export const {
  install,
  stopInstalling,
  startFakeInstall,
  stopFakeInstall,
  setIsDownloaded,
  setInstallProgress,
  setInstallProgressIsPending,
} = instalSlice.actions;

export default instalSlice.reducer;
