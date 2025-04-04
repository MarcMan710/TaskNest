// This component represents a single task item in the task list. It allows users to update the task's status, due date, and priority level. It also provides options to save changes or delete the task.
import React, { useState, useEffect } from "react";
import taskApi from "../../api/taskApi";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : "");
  const [priority, setPriority] = useState(task.priority);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(task.status);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setPriority(task.priority);
  }, [task]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedTask = { ...task, status, dueDate, priority };
      const response = await taskApi.updateTask(task.id, updatedTask);
      onUpdate(response);
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <li className={`task-item priority-${priority.toLowerCase()}`}>
      <div className="task-info">
        <span>{task.title}</span>
        <select value={status} onChange={handleStatusChange}>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="task-actions">
        <button onClick={handleUpdate} className="btn btn-save" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <button onClick={() => onDelete(task.id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
