import { createContext, useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';

// ✅ Create Context
export const TaskContext = createContext();

// ✅ Task Provider
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data?.message);
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  // ✅ Add Task
  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error.response?.data?.message);
    }
  };

  // ✅ Update Task
  const editTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task:', error.response?.data?.message);
    }
  };

  // ✅ Delete Task
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.response?.data?.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
