import { createSlice } from "@reduxjs/toolkit";
export const demoCode = `from turtle import *
color('darkblue')
ht()
up()
goto(0, -100)
down()
circle(100)
up()
goto(-60, 50)
dot(30)
goto(60, 50)
dot(30)
goto(-40, 0)
down()
rt(60)
circle(50, 120)`;

export const getCurrentDateTime = () => {
  const dt = new Date();
  return `${dt.getFullYear()}-${
    dt.getMonth() + 1
  }-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
};

const defaultFile = {
  id: null,
  title: "unnamed",
  code: "",
  datetime: getCurrentDateTime(),
};
const defaultFiles = [];

const savedFiles = JSON.parse(localStorage.getItem("files")) || defaultFiles;
const savedCurrentFile =
  JSON.parse(localStorage.getItem("currentFile")) || defaultFile;

const initialState = {
  files: savedFiles,
  currentFile: savedCurrentFile,
};

export const pythonFileListSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
      localStorage.setItem("currentFile", JSON.stringify(state.currentFile));
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
      localStorage.setItem("files", JSON.stringify(state.files));
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
      localStorage.setItem("files", JSON.stringify(state.files));
    },
    updateFile: (state, action) => {
      state.files = state.files.map((file) =>
        file.id === action.payload.id ? { ...file, ...action.payload } : file
      );
      localStorage.setItem("files", JSON.stringify(state.files));
    },
  },
});

export const { setCurrentFile, addFile, deleteFile, updateFile } =
  pythonFileListSlice.actions;
export default pythonFileListSlice.reducer;
