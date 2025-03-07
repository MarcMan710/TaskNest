import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user ? user.name : 'Guest'}</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
