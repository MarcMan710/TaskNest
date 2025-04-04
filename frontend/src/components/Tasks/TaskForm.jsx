// TaskForm component allows users to add new tasks.
import { useState } from "react";
import useTasks from "../../hooks/useTasks";
import "../../styles/tasks.css";

/**
 * TaskForm component for adding new tasks.
 * @returns {JSX.Element} The rendered TaskForm component.
 */
const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { addTask } = useTasks();

  /**
   * Handles the form submission to add a new task.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return; // Prevent adding empty tasks
    await addTask({ title: taskTitle });
    setTaskTitle(""); // Clear the input field after submission
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title..."
          className="task-input"
        />
        <button type="submit" className="add-task-button">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;
