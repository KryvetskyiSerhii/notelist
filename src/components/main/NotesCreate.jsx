import { useFormik } from "formik";
import classes from "./NotesForm.module.css";
import * as Yup from "yup";
import {useDispatch} from 'react-redux'
import { addNote } from "../../toolkitRedux/toolkitSlice";

const NotesCreate = (props) => {
  
  const dispatch = useDispatch()
  
  const addNewNote = (values) => {
    dispatch(addNote({newNoteTitle: values.newNoteTitle, newNoteBody: values.newNoteBody}));
  };

  const initialValues = {
    newNoteTitle: "",
    newNoteBody: "",
  };

  const validationSchema = Yup.object({
    newNoteTitle: Yup.string()
      .max(120, "Must be no more than 120 characters")
      .min(3, "Must be at least 4 characters")
      .required("Required field"),
    newNoteBody: Yup.string()
      .max(500, "Must be no more than 120 characters")
      .min(5, "Must be at least 6 characters")
      .required("Required field"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (value) => {
      await addNewNote(value);
    },
    validationSchema: validationSchema,
  });
    return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      
      <input
        className={classes.titleInput}
        id="newNoteTitle"
        name="newNoteTitle"
        type="text"
        onChange={formik.handleChange}
      />
      {formik.errors.newNoteTitle && <div className={classes.error}>{formik.errors.newNoteTitle}</div>}
      
      <textarea
        className={classes.text}
        id="newNoteBody"
        name="newNoteBody"
        type="textarea"
        onChange={formik.handleChange}
      />
      {formik.errors.newNoteBody && <div className={classes.errorBody}>{formik.errors.newNoteBody}</div>}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default NotesCreate;
