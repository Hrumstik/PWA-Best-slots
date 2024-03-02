import { createSlice } from "@reduxjs/toolkit";

export interface InstalState {
  isInstalling: boolean;
  fakeDownload: boolean;
  isDownloaded: boolean;
  fakeDownloadProgress: string;
}

const initialState: InstalState = {
  isInstalling: false,
  fakeDownload: false,
  isDownloaded: false,
  fakeDownloadProgress: "Waiting...",
};

export const instalSlice = createSlice({
  name: "install",
  initialState,
  reducers: {
    install: (state) => {
      state.isInstalling = true;
    },
    startFakeDownload: (state) => {
      state.fakeDownload = true;
    },
    stopFakeFakeDownload: (state) => {
      state.fakeDownload = false;
    },
    stopInstalling: (state) => {
      state.isInstalling = false;
    },
    setIsDownloaded: (state) => {
      state.isDownloaded = true;
    },
    setFakeDownloadProgress: (state, action) => {
      state.fakeDownloadProgress = action.payload + "% of 15 MB";
    },
  },
});

export const {
  install,
  stopInstalling,
  startFakeDownload,
  stopFakeFakeDownload,
  setIsDownloaded,
  setFakeDownloadProgress,
} = instalSlice.actions;

export default instalSlice.reducer;
