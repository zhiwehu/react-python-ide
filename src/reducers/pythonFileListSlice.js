import { createSlice } from "@reduxjs/toolkit";
export const demoCode = `import math
from datetime import date, timedelta
from turtle import *

y, m, d = input("请输入你的出生日期(格式：年-月-日)：").split("-")
years = int(input("请输入你希望活多少岁："))
birthday = date(year=int(y), month=int(m), day=int(d))
today = date.today()
deathday = birthday + timedelta(days=math.ceil(years * 365.25))

used = today - birthday
left = deathday - today

#setup(800, 800)
shape("square")
#shapesize(0.35, 0.35)
speed(0)
up()
title = "你已经过了{}天，还剩下{}天。".format(used.days, left.days)
goto(0, 200)
write(title, align="center", font=("Kai", 16, "bold"))
goto(0, 180)

r = 5
total_weeks = int(used.days / 7 + left.days / 7)
dots = math.ceil(math.sqrt(total_weeks))
goto(-dots / 2 * r, dots / 2 * r)
line = 0
color("orange")
for i in range(total_weeks):
    if i == used.days // 7:
        color("lightgreen")
    if i % dots == 0:
        x = -dots // 2 * r
        y = dots // 2 * r - line * r
        line = line + 1
        goto(x, y)
    stamp()
    fd(r)
`;

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
  output: "",
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
    setOutput: (state, action) => {
      state.output = action.payload;
    },
  },
});

export const { setCurrentFile, addFile, deleteFile, updateFile, setOutput } =
  pythonFileListSlice.actions;
export default pythonFileListSlice.reducer;
