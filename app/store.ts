import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
