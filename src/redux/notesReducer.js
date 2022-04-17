const ADD_NOTE = "ADD-NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SEARCH_NOTE = "SEARCH_NOTE";
const SORT_NOTES_TITLE = "SORT_NOTES_TITLE";
const SORT_NOTES_DATE = "SORT_NOTES_DATE";

let initialState = {
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
};
let newStateForFilter = { ...initialState, notesList: [...initialState.notesList] }

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      let newNote = {
        id: Date(),
        noteTitle: action.newNoteTitle,
        noteBody: action.newNoteBody,
        date: Date(),
      };
      let newState = { ...state, notesList: [...state.notesList] };
      newState.notesList.push(newNote);
      newStateForFilter.notesList.push(newNote)
      return newState;
    }

    case EDIT_NOTE: {
      let newNote = {
        id: action.id,
        noteTitle: action.newNoteTitle,
        noteBody: action.newNoteBody,
        date: Date(),
      };
      let newState = { ...state, notesList: [...state.notesList] };
      let targetIdPosition = newState.notesList.findIndex(
        (e) => e.id === action.id
      );
      newState.notesList.splice(targetIdPosition, 1, newNote);
      newStateForFilter.notesList.splice(targetIdPosition, 1, newNote);
      return newState;
    }
    case DELETE_NOTE: {
      let newState = { ...state, notesList: [...state.notesList] };
      newState.notesList = newState.notesList.filter((e) => e.id !== action.id);
      newStateForFilter.notesList = newStateForFilter.notesList.filter(e => e.id !==action.id)
      return newState;
    }
    case SEARCH_NOTE: {
      let newFilteredState = { ...state, notesList: [...state.notesList] };      
      newFilteredState.notesList = newFilteredState.notesList.filter((e) => e.noteTitle.toLowerCase().includes(action.noteTitle))
      if (action.noteTitle.trim() === '') return newStateForFilter
      else return newFilteredState

    }
    case SORT_NOTES_TITLE: {
      let newState = { ...state, notesList: [...state.notesList] };
      newState.notesList = newState.notesList.sort((a, b) =>
        a.noteTitle > b.noteTitle ? 1 : b.noteTitle > a.noteTitle ? -1 : 0
      );
      return newState;
    }

    case SORT_NOTES_DATE: {
      let newState = { ...state, notesList: [...state.notesList] };
      newState.notesList = newState.notesList.sort((a, b) =>
        a.date > b.date ? 1 : b.date > a.date ? -1 : 0
      );
      return newState;
    }
    default:
      return state;
  }
};

export const addNoteActionCreator = (newNoteTitle, newNoteBody) => ({
  type: ADD_NOTE,
  newNoteTitle,
  newNoteBody,
});
export const editNoteActionCreator = (id, newNoteTitle, newNoteBody) => ({
  type: EDIT_NOTE,
  id,
  newNoteTitle,
  newNoteBody,
});
export const deleteNoteActionCreator = (id) => ({ type: DELETE_NOTE, id });
export const searchNoteActionCreator = (noteTitle) => ({
  type: SEARCH_NOTE,
  noteTitle,
});
export const sortNotesTitleActionCreator = () => ({ type: SORT_NOTES_TITLE });
export const sortNotesDateActionCreator = () => ({ type: SORT_NOTES_DATE });

export default notesReducer;
