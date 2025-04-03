// This component displays navigation links based on user authentication.
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/navbar.css"; // Import styles

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h1>TaskNest</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/tasks">My Tasks</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
