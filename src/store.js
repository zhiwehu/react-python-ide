import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducers/IDESettingsSlice";
import pythonFileListReducer from "./reducers/pythonFileListSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    code: pythonFileListReducer,
  },
});
