import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  codeFullSize: false,
  canvasFullSize: false,
  consoleFullSize: false,
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
  },
});

export const { toggleCodeSize, toggleCanvasSize, toggleConsoleSize } =
  windowSizeSlice.actions;
export default windowSizeSlice.reducer;
