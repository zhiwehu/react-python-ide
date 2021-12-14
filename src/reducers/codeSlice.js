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

const savedCode = localStorage.getItem("code") || "";
const savedTitle = localStorage.getItem("title") || "unnamed";

const initialState = {
  title: savedTitle,
  code: savedCode,
  result: "",
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setCode, setResult, setTitle } = codeSlice.actions;
export default codeSlice.reducer;
