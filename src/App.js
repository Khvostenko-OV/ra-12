import './App.css';
import Notes from './Notes';

//const cards = [{id:1, content:'First card'}]

function App() {
  return (
    <Notes backend='http://localhost:7070/notes/'/>
  );
}

export default App;
