import { useFormik } from "formik";
import * as Yup from "yup";
import {useDispatch} from 'react-redux'
import { addNote } from "../../toolkitRedux/toolkitSlice";
import Form from "../Form/Form";
import classes from "./../Form/NotesForm.module.css"

const CreateNotes = (props) => {
  
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
      <div>
      <div className={classes.create}>
        <Form formik={formik}/>
        <button type="submit" onClick={formik.handleSubmit} className={classes.submit}>Submit</button>
      </div>
      </div>
  );
};

export default CreateNotes;
