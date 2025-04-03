import { useState } from "react";
import taskApi from "../../api/taskApi";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const updatedTask = await taskApi.updateTaskStatus(task.id, newStatus);
    onUpdate(updatedTask);
  };

  return (
    <li className="task-item" key={task.id}>
      <span>{task.title}</span>
      <select value={status} onChange={handleStatusChange}>
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={() => onDelete(task.id)} className="btn btn-delete">Delete</button>
    </li>
  );
};

export default TaskItem;
