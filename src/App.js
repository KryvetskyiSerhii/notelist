import './App.css';
import {Route, Routes} from 'react-router-dom'
import Notes from './components/notes/Notes';
import CreateNotes from './components/main/CreateNotes';
import EditNotes from './components/main/EditNotes';
function App(props) {
  return (
    <div className="appWrapper">
      <Notes store={props.store} />
      <Routes>     
      <Route path='/main/' element ={<CreateNotes store={props.store} />} />
      <Route path='/main/:id'  element ={<EditNotes store={props.store} />} />
    </Routes> 
    </div>
  );
}

export default App;
