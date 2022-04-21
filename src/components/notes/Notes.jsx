import classes from './Notes.module.css'
import Note from './Note'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { searchNote, sortNotesByDate, sortNotesByTitle } from '../../toolkitRedux/toolkitSlice'
 


const Notes = (props) => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes.notesList)
    const notesFilter = useSelector(state => state.notes.notesListFilter)

    let searchNotes = (e) => {
        dispatch(searchNote(e.target.value))
    }

    let sortNotesTitle = () => {
        dispatch(sortNotesByTitle())
    }    

    let sortNotesDate = () => {
       dispatch(sortNotesByDate())
    }
    
   
    
    return (
        <div>
            <div className={classes.header}>
                <div onClick={sortNotesTitle} className={classes.titleButton} id='noteTitle'>Title</div>
                <input type='text' onChange={searchNotes} placeholder='Search for note'/>
                <div id='date' onClick={sortNotesDate} className={classes.titleButton}>Date</div>
            </div>
            <div className={classes.addButton}>
            <NavLink to="/main/" className={classes.link}>Add Note</NavLink>
            </div>
            {notes.map(element=> {
                return <Note id={element.id} title={element.noteTitle} key={`note-${element.id}` } date={element.date}/>
            })}
        </div>
    )
}

export default Notes