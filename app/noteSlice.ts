import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoadNoteArgs,
  loadNoteAsync,
  saveNoteAsync,
  updateNoteAsync,
} from "./api/api";
import { RootState } from "./store";

export const localStorageKey = "editorNote";

export const emptyNote: Note = {
  id: "",
  content: "",
  title: "Without title",
  editCode: "",
};

export interface Note {
  content: string;
  id: string;
  title: string;
  editCode?: string;
}

export interface NoteSliceState {
  note: Note;
  loading: "idle" | "pending" | "succeeded" | "failed";
  saving: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: NoteSliceState = {
  note: emptyNote,
  loading: "idle",
  saving: "idle",
};

export const getTitle = (content: string): string => {
  const regex = /^\s*#(?!#)(.*)/g;
  const result = regex.exec(content);
  if (result === null) return emptyNote.title;

  return result.length > 1 ? result[1].trim() : emptyNote.title;
};

export const saveNote = createAsyncThunk(
  "note/saveNote",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state.note.note === null || state.note.note.content === "")
      throw new Error();

    if (state.note.note.editCode) {
      return await updateNoteAsync(state.note.note);
    }

    return await saveNoteAsync(state.note.note);
  }
);

export const loadNote = createAsyncThunk(
  "note/loadNote",
  async (args: LoadNoteArgs, thunkAPI) => {
    const result = await loadNoteAsync(args);
    if (result === null) throw new Error();
    return result;
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNoteContent: (state, payload: PayloadAction<string>) => {
      state.note.content = payload.payload;
      const title = getTitle(state.note.content);
      state.note.title = title;
      localStorage.setItem(localStorageKey, payload.payload);
    },

    setNote: (state, { payload }: PayloadAction<Note>) => {
      state.note = payload;
    },

    setNoteTitle: (state, { payload }: PayloadAction<string>) => {
      state.note.title = payload;
    },

    noteSaved: (state) => {
      state.saving = "idle";
      state.loading = "idle";
      state.note = { ...emptyNote };
      localStorage.setItem(localStorageKey, emptyNote.content);
    },

    loadNoteContentFromLocalstorage: (state) => {
      state.note.content =
        localStorage.getItem(localStorageKey) ?? emptyNote.content;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadNote.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loadNote.fulfilled, (state, action) => {
        state.note = action.payload;
        state.loading = "succeeded";
      })
      .addCase(loadNote.rejected, (state, action) => {
        state.note = { ...emptyNote };
        state.loading = "failed";
      });

    builder
      .addCase(saveNote.pending, (state) => {
        state.saving = "pending";
      })
      .addCase(saveNote.fulfilled, (state, action) => {
        state.saving = "succeeded";
        state.note.id = action.payload.id;
        state.note.editCode = action.payload.editCode;
        // state.note = { ...emptyNote };
        // state.saving = "idle";
        // state.loading = "idle";
        // localStorage.setItem(localStorageKey, emptyNote.content);
      })
      .addCase(saveNote.rejected, (state) => {
        state.saving = "failed";
      });
  },
});

export const {
  loadNoteContentFromLocalstorage,
  setNote,
  setNoteContent,
  noteSaved,
} = noteSlice.actions;

export default noteSlice.reducer;
