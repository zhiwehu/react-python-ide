import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  codeFullSize: false,
  canvasFullSize: false,
  consoleFullSize: false,
  codeShow: true,
  canvasShow: true,
  consoleShow: true,
};

export const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    toggleCodeSize: (state) => {
      state.codeFullSize = !state.codeFullSize;
    },
    toggleCanvasSize: (state) => {
      state.canvasFullSize = !state.canvasFullSize;
    },
    toggleConsoleSize: (state) => {
      state.consoleFullSize = !state.consoleFullSize;
    },
    toggleShowHideCode: (state) => {
      state.codeShow = !state.codeShow;
    },
    toggleShowHideCanvas: (state) => {
      state.canvasShow = !state.canvasShow;
    },
    toggleShowHideConsole: (state) => {
      state.consoleShow = !state.consoleShow;
    },
  },
});

export const {
  toggleCodeSize,
  toggleCanvasSize,
  toggleConsoleSize,
  toggleShowHideCode,
  toggleShowHideCanvas,
  toggleShowHideConsole,
} = windowSizeSlice.actions;
export default windowSizeSlice.reducer;
