// This component allows users to add new tasks.
import { useState } from "react";
import useTasks from "../../hooks/useTasks";
import "../../styles/tasks.css"; // Import styles


const TaskForm = () => {
  const [title, setTitle] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await addTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter task title..." 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
