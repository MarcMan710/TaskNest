import React, { useEffect, useState } from "react";
import taskApi from "../../api/taskApi";
import TaskItem from "./TaskItem";
import "../../styles/tasks.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await taskApi.getTasks();
      setTasks(response);
    };
    fetchTasks();
  }, []);

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id) => {
    await taskApi.deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Sorting logic: Prioritize High > Medium > Low and then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
