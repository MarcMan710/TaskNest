// This file manages tasks globally to avoid excessive API calls.
import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when user logs in
  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      if (response.ok) setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
