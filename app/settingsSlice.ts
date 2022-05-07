import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isVimModeStorageKey = (id: string) => `${id}_isVimMode`;

export interface SettingsSliceState {
  isVimMode: boolean;
}

const initialState: SettingsSliceState = {
  isVimMode: true,
};

export interface SetActionPayload {
  value: boolean;
}

const localStorageKey = "isVimMode";

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<SetActionPayload>) => {
      localStorage.setItem(localStorageKey, payload.value.toString());
      state.isVimMode = payload.value;
    },
    loadSettingsFromLocalstorage: (state) => {
      state.isVimMode =
        localStorage.getItem(localStorageKey) === "true" ??
        initialState.isVimMode;
    },
  },
});

export const { loadSettingsFromLocalstorage, set } = settingsSlice.actions;
export default settingsSlice.reducer;
