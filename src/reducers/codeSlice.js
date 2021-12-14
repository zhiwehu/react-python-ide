import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
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
