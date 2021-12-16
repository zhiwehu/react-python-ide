import { createSlice } from "@reduxjs/toolkit";

let initialState = JSON.parse(localStorage.getItem("IDESettings")) || {
  codeFullSize: false,
  canvasFullSize: false,
  consoleFullSize: false,
  codeShow: true,
  canvasShow: true,
  consoleShow: true,
  fontSize: 16,
};

export const IDESettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleCodeSize: (state) => {
      state.codeFullSize = !state.codeFullSize;
      initialState = { ...initialState, codeFullSize: state.codeFullSize };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    toggleCanvasSize: (state) => {
      state.canvasFullSize = !state.canvasFullSize;
      initialState = { ...initialState, canvasFullSize: state.canvasFullSize };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    toggleConsoleSize: (state) => {
      state.consoleFullSize = !state.consoleFullSize;
      initialState = {
        ...initialState,
        consoleFullSize: state.consoleFullSize,
      };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    toggleShowHideCode: (state) => {
      state.codeShow = !state.codeShow;
      initialState = { ...initialState, codeShow: state.codeShow };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    toggleShowHideCanvas: (state) => {
      state.canvasShow = !state.canvasShow;
      initialState = { ...initialState, canvasShow: state.canvasShow };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    toggleShowHideConsole: (state) => {
      state.consoleShow = !state.consoleShow;
      initialState = { ...initialState, consoleShow: state.consoleShow };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      initialState = { ...initialState, fontSize: state.fontSize };
      localStorage.setItem("IDESettings", JSON.stringify(initialState));
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
  setFontSize,
} = IDESettingsSlice.actions;
export default IDESettingsSlice.reducer;
