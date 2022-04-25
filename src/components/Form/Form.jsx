import classes from "./NotesForm.module.css";




const Form = (props) => {
   
    return (
        <form onSubmit={props.formik.handleSubmit} className={classes.form}>
      
      <input
        className={classes.titleInput}
        id="newNoteTitle"
        name="newNoteTitle"
        type="text"
        onChange={props.formik.handleChange}
      />
      {props.formik.errors.newNoteTitle && <div className={classes.error}>{props.formik.errors.newNoteTitle}</div>}
      
      <textarea
        className={classes.text}
        id="newNoteBody"
        name="newNoteBody"
        type="textarea"
        onChange={props.formik.handleChange}
      />
      {props.formik.errors.newNoteBody && <div className={classes.errorBody}>{props.formik.errors.newNoteBody}</div>}
      </form>
    )
}

export default Form