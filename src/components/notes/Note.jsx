import classes from './Notes.module.css'
import { NavLink } from 'react-router-dom'


const Note = (props) => {
    return (
        <div className={classes.note}>
        <NavLink to={'/main/' + props.id}  className={classes.link} id={props.id}>{props.title}</NavLink>
        </div>
        
    )
}

export default Note