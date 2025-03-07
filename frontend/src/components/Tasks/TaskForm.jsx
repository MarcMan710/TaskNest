import { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
