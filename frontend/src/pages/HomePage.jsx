// This is the landing page that welcomes users and offers login/register options.
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to TaskNest</h1>
      {user ? (
        <Link to="/tasks">Go to Dashboard</Link>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
