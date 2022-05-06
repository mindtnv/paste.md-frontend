import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const documentLocalStorageKey = (editorId: string) =>
  `${editorId}_document`;

export interface DocumentSliceState {
  document: string;
}

const initialState: DocumentSliceState = {
  document: "",
};

export interface SetActionPayload {
  document: string;
  editorId: string;
}

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    set: (state, payload: PayloadAction<SetActionPayload>) => {
      state.document = payload.payload.document;
      localStorage.setItem(
        documentLocalStorageKey(payload.payload.editorId),
        payload.payload.document
      );
    },
    loadFromLocalstorage: (state, editorId: PayloadAction<string>) => {
      state.document =
        localStorage.getItem(documentLocalStorageKey(editorId.payload)) ??
        initialState.document;
    },
  },
});

export const { set, loadFromLocalstorage } = documentSlice.actions;
export default documentSlice.reducer;
