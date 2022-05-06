import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isVimModeStorageKey = (id: string) => `${id}_isVimMode`;

export interface SettingsSliceState {
  isVimMode: boolean;
}

const initialState: SettingsSliceState = {
  isVimMode: true,
};

export interface SetActionPayload {
  editorId: string;
  value: boolean;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<SetActionPayload>) => {
      localStorage.setItem(
        isVimModeStorageKey(payload.editorId),
        payload.value.toString()
      );
      state.isVimMode = payload.value;
    },
    loadFromLocalstorage: (state, { payload }: PayloadAction<string>) => {
      state.isVimMode =
        localStorage.getItem(isVimModeStorageKey(payload)) === "true" ??
        initialState.isVimMode;
    },
  },
});

export const { loadFromLocalstorage, set } = settingsSlice.actions;
export default settingsSlice.reducer;
