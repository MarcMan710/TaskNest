import { useEffect, useState } from "react";
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

  const renderTasks = (status) => (
    <div className="task-column">
      <h3>{status}</h3>
      <ul>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          ))}
      </ul>
    </div>
  );

  return (
    <div className="task-board">
      {renderTasks("To-Do")}
      {renderTasks("In Progress")}
      {renderTasks("Done")}
    </div>
  );
};

export default TaskList;
