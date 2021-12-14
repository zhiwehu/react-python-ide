import { configureStore } from "@reduxjs/toolkit";
import windowSizeReducer from "./reducers/IDEWindowSizeSlice";
import codeReducer from "./reducers/codeSlice";

export const store = configureStore({
  reducer: {
    windowSize: windowSizeReducer,
    code: codeReducer,
  },
});
