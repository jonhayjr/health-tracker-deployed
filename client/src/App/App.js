import {useState} from 'react';

//Import Components
import Header from '../Header/Header';
import Button from '../Button/Button';
import Form from '../Form/Form';
import Footer from '../Footer/Footer';
import NoteDetail from '../NoteDetail/NoteDetail';

const App = () => {

  const [showAddTask, setAddTask] = useState(true);

  //Function to toggle show AddTaskForm
  const toggleShowAddTask = () => {
    setAddTask(!showAddTask);
  }

  return (
    <div>
      <Header/>
      <Button onClick={toggleShowAddTask} showAddTask={showAddTask}/>
      {
        showAddTask && <Form />
      }
      <NoteDetail />
      <Footer/>
    </div>
  );
}

export default App;
