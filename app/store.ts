import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./documentSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    document: documentReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
