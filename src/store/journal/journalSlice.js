import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    savedMessage: "",
    notes: [],
    activeNote : null
}

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
      state.savedMessage = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload.notes;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(
        note =>  note.id === action.payload.id
          ? action.payload
          : note
        );
      state.savedMessage = `Nota actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    }
  }
});

export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;