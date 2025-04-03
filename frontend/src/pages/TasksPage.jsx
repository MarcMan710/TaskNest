// This page displays tasks and allows users to add, edit, or delete them.
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";

const TasksPage = () => {
  return (
    <div>
      <h2>My Tasks</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;
