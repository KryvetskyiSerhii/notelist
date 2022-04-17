import { createSlice } from "@reduxjs/toolkit";





const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        notesList: [
          {
            id: "4",
            noteTitle: "1",
            noteBody: "12",
            date: Date(),
          },
          {
            id: "2",
            noteTitle: "note",
            noteBody: "gdfgdf",
            date: Date(),
          },
        ],
      },
    reducers: {
        addNote(state, action) {
            let newNote = {
                id: Date(),
                noteTitle: action.payload.newNoteTitle,
                noteBody: action.payload.newNoteBody,
                date: Date(),
              };
              state.notesList.push(newNote)
              state.notesListFilter.push(newNote)   
        },
       editNote (state, action) {
        let newNote = {
            id: action.payload.id,
            noteTitle: action.payload.newNoteTitle,
            noteBody: action.payload.newNoteBody,
            date: Date(),
          };
        let targetIdPosition = state.notesList.findIndex(
            (e) => e.id === action.payload.id
          );
          state.notesList.splice(targetIdPosition, 1, newNote);
       },
       deleteNote (state, action) {
        state.notesList = state.notesList.filter((e) => e.id !== action.payload);
       },
       searchNote (state, action, notesListFilter ) {
        let newFilteredState = { ...state, notesList: [...state.notesList] }; 
        newFilteredState.notesList = newFilteredState.notesList.filter((e) => e.noteTitle.toLowerCase().includes(action.payload))
        if (action.payload.trim() === '') return state
        else return newFilteredState
       },
       sortNotesByTitle (state) {
        state.notesList = state.notesList.sort((a, b) =>
        a.noteTitle > b.noteTitle ? 1 : b.noteTitle > a.noteTitle ? -1 : 0
      );
       },
       sortNotesByDate (state) {
        state.notesList = state.notesList.sort((a, b) =>
        a.date > b.date ? 1 : b.date > a.date ? -1 : 0
      );
       }

    }  
})

export default toolkitSlice.reducer
export const {addNote, editNote, deleteNote, searchNote, sortNotesByTitle, sortNotesByDate} = toolkitSlice.actions