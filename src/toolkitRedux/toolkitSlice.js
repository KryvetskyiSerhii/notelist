import { createSlice } from "@reduxjs/toolkit";


const filterState = {
  notesList : [
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
  ]
}


const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        ...filterState, notesList: [...filterState.notesList]
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
              filterState.notesList.push(newNote)
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
          filterState.notesList.splice(targetIdPosition, 1, newNote)
       },
       deleteNote (state, action) {
        state.notesList = state.notesList.filter((e) => e.id !== action.payload);
        filterState.notesList = filterState.notesList.filter(e => e.id !== action.payload)
       },
       searchNote (state, action) {
        let newFilteredState = { ...state, notesList: [...state.notesList] }; 
        newFilteredState.notesList = newFilteredState.notesList.filter((e) => e.noteTitle.toLowerCase().includes(action.payload))
        if (action.payload.trim() === '') return filterState
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