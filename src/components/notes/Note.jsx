import classes from './Notes.module.css'
import { NavLink } from 'react-router-dom'


const Note = (props) => {
    return (
        
        <NavLink to={'/main/' + props.id}  className={classes.link} id={props.id}>
            <div className={classes.note}>{props.title}<div>{props.date.slice(3, 15)}</div></div>
            </NavLink>
        
    )
}

export default Note