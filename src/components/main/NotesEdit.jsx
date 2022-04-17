import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./NotesForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editNote, deleteNote } from "../../toolkitRedux/toolkitSlice";


const NotesEdit = ({ ...props }) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notesList)

  const initialValues = {
    id: id,
    newNoteTitle: "",
    newNoteBody: "",
  };

  const {setFieldValue ,...formik} = useFormik({
    initialValues: initialValues,
    onSubmit: async (value) => {
      await editRecentNote(value);
    },
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
      <textarea
        className={classes.text}
        id="newNoteBody"
        name="newNoteBody"
        onChange={formik.handleChange}
        value={formik.values.newNoteBody}
      ></textarea>
      <div>
        <button type="submit">Save</button>
        <button onClick={deleteRecentNote} type="button">
          Delete
        </button>
      </div>
    </form>
  );
};

export default NotesEdit;
