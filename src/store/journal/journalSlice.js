import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: "",
    notes: [],
    activeNote: null
};

export const journalSlice = createSlice({
  name: "journalSlice",
  initialState,
  reducers: {
    startSavingNewNote: ( state ) => {
        state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
        state.activeNote = action.payload;
        state.messageSaved = "";
    },
    setNotes: ( state, action ) => {
        state.notes = action.payload;
    },
    setSaving: ( state ) => {
        state.isSaving = true;
        state.messageSaved = "";
    },
    updateNote: ( state, { payload } ) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => {
            if ( note.id === payload.id ) {
                return payload;
            }
            return note;
        });

        state.messageSaved = `${ payload.title }, actualizada correctamente`;
    },

    setPhotosToActiveNote: (state, action) => {
        state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ];
        state.isSaving = false;
    },

    clearNotesLogout: ( state ) => {
        state.isSaving = false;
        state.messageSaved = "";
        state.notes = [];
        state.activeNote = null;
    },

    deleteNoteById: ( state, { payload } ) => {
        state.activeNote = null;
        state.notes = state.notes.filter( note => note.id !== payload );
    }
  }
});

export const {
    startSavingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout
} = journalSlice.actions;