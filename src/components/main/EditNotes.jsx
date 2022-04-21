import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editNote, deleteNote } from "../../toolkitRedux/toolkitSlice";
import classes from "./../Form/NotesForm.module.css"
import * as Yup from "yup";

const EditNotes = ({ ...props }) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notesList)

  const initialValues = {
    id: id,
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

  const {setFieldValue ,...formik} = useFormik({
    initialValues: initialValues,
    onSubmit: async (value) => {
      await editRecentNote(value);
    },
    validationSchema: validationSchema
  });

  useEffect(() => {
    setFieldValue(
      "newNoteTitle",
      notes.find((e) => id === e.id)
        ? notes.find((e) => id === e.id).noteTitle
        : ""
    );
    setFieldValue(
      "newNoteBody",
      notes.find((e) => id === e.id)
        ? notes.find((e) => id === e.id).noteBody
        : ""
    );
  }, [id, setFieldValue, notes]);

  const editRecentNote = (values) => {
    dispatch(editNote({id: id, newNoteTitle: values.newNoteTitle, newNoteBody: values.newNoteBody}));
    initialValues.newNoteTitle = notes.find((e) => id === e.id)
      ? notes.find((e) => id === e.id).noteTitle
      : "";
  };

  const deleteRecentNote = () => {
    dispatch(deleteNote(id));
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
        <input
        className={classes.titleInput}
        id="newNoteTitle"
        name="newNoteTitle"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.newNoteTitle}
      />
      {formik.errors.newNoteTitle && <div className={classes.error}>{formik.errors.newNoteTitle}</div>}
      <textarea
        className={classes.text}
        id="newNoteBody"
        name="newNoteBody"
        onChange={formik.handleChange}
        value={formik.values.newNoteBody}
      ></textarea>
      {formik.errors.newNoteBody && <div className={classes.errorBody}>{formik.errors.newNoteBody}</div>}
      <div>
        <button type="submit">Save</button>
        <button onClick={deleteRecentNote} type="button">
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditNotes;
