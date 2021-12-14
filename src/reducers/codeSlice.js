import { createSlice } from "@reduxjs/toolkit";
let demoCode = `from turtle import *
from math import *
from random import *

for i in range(10):
    print("#{}. Hello World".format(i))

speed(0)
seth(90)
colormode(255)
up()
goto(0, -200)
down()

def square(s, a, n):
    if n==0:
        return
    down()
    color(randint(0, 255), randint(0, 255), randint(0, 255))
    begin_fill()
    for i in range(4):
        fd(s)
        rt(90)
    end_fill()    
    up()
    fd(s)
    lt(a)
    
    square(s*cos(radians(a)), a, n-1)
        
    rt(90)
    fd(s*cos(radians(a)))
    
    square(s*sin(radians(a)), a, n-1)
    
    bk(s*cos(radians(a)))
    lt(90-a)
    bk(s) 

square(100, 36, 5)`;
const initialState = {
  code: demoCode,
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
  },
});

export const { setCode, setResult } = codeSlice.actions;
export default codeSlice.reducer;
