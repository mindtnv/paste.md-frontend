import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDocumentAsync, saveDocumentAsync } from "./api/api";
import { RootState } from "./store";

export interface DocumentSliceState {
  document: string | null;
  meta: {
    id: string;
    editCode: string;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
  saving: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: DocumentSliceState = {
  document: "",
  meta: {
    id: "",
    editCode: "",
  },
  loading: "idle",
  saving: "idle",
};

export interface SetActionPayload {
  document: string;
}

export interface SetMetaPayload {
  id: string;
}

const localStorageKey = "editorDocument";

export const saveDocument = createAsyncThunk(
  "document/saveDocument",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state.document.document === null || state.document.document === "")
      throw new Error();

    return await saveDocumentAsync(state.document.document);
  }
);

export const loadDocument = createAsyncThunk(
  "document/loadDocument",
  async (id: string, thunkAPI) => {
    const result = await loadDocumentAsync(id);
    if (result === null) throw new Error();

    return result;
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocument: (state, payload: PayloadAction<SetActionPayload>) => {
      state.document = payload.payload.document;
      localStorage.setItem(localStorageKey, payload.payload.document);
    },
    setMeta: (state, { payload }: PayloadAction<SetMetaPayload>) => {
      state.meta.id = payload.id;
    },
    documentSaved: (state) => {
      state.saving = "idle";
      state.document = "";
      localStorage.setItem(localStorageKey, "");
    },
    loadDocumentFromLocalstorage: (state) => {
      state.document =
        localStorage.getItem(localStorageKey) ?? initialState.document;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDocument.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loadDocument.fulfilled, (state, action) => {
        if (action.payload?.content) {
          state.document = action.payload?.content;
        }
        state.loading = "succeeded";
      })
      .addCase(loadDocument.rejected, (state, action) => {
        state.loading = "failed";
      });

    builder
      .addCase(saveDocument.pending, (state) => {
        state.saving = "pending";
      })
      .addCase(saveDocument.fulfilled, (state, action) => {
        state.saving = "succeeded";
        state.meta.id = action.payload?.id!;
        state.meta.editCode = action.payload?.editCode!;
      })
      .addCase(saveDocument.rejected, (state) => {
        state.saving = "failed";
      });
  },
});

export const {
  setDocument,
  loadDocumentFromLocalstorage,
  setMeta,
  documentSaved,
} = documentSlice.actions;
export default documentSlice.reducer;
