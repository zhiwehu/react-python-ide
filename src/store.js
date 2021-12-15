import { configureStore } from "@reduxjs/toolkit";
import windowSizeReducer from "./reducers/IDEWindowSizeSlice";
import pythonFileListReducer from "./reducers/pythonFileListSlice";

export const store = configureStore({
  reducer: {
    windowSize: windowSizeReducer,
    code: pythonFileListReducer,
  },
});
