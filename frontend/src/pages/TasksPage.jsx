// This page displays tasks and allows users to add, edit, or delete them.
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import { useEffect } from "react";
import useTasks from "../hooks/useTasks";

const TasksPage = () => {
  const { fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h2>My Tasks</h2>
      <TaskForm />
      <TaskList/>
    </div>
  );
};

export default TasksPage;
