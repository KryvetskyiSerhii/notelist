import './App.css';
import {Route, Link, Routes} from 'react-router-dom'
import Notes from './components/notes/Notes';
import NotesCreate from './components/main/NotesCreate';
import NotesEdit from './components/main/NotesEdit';

function App(props) {
  return (
    <div className="appWrapper">
      <Notes store={props.store} />
      <Routes>     
      <Route path='/main/' element ={<NotesCreate store={props.store} />} />
      <Route path='/main/:id'  element ={<NotesEdit store={props.store} />} />
    </Routes> 
    </div>
  );
}

export default App;
