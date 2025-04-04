// This file manages tasks globally to avoid excessive API calls.
import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import useAuth from "../hooks/useAuth";
import taskApi from "../api/taskApi";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth(); // This token is from useAuth, not AuthContext
  // Fetch tasks when user logs in
  useEffect(() => {
    if (token) fetchTasks(); 
  }, [token]);

  const fetchTasks = async () => {
    try{
      const response = await taskApi.getTasks();
      setTasks(response);
    }catch(error){
      console.error("Error fetching tasks", error);
    } 
  };

  const addTask = async (task) => {
    try{
      const newTask = await taskApi.addTask(task);
      setTasks([...tasks, newTask]);
    }catch(error){
      console.error("Error adding task", error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try{
      await taskApi.updateTask(taskId, updatedTask);
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    }catch(error){
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try{
      await taskApi.deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    }catch(error){
      console.error("Error deleting task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

export default TaskContext;
