import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to TaskNest</h1>
      <p>Manage your tasks efficiently.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
