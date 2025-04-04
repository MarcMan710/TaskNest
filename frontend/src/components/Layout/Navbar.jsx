// Navbar component for displaying navigation links based on user authentication.
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  // Navigation links for authenticated users
  const authLinks = (
    <>
      <li>
        <Link to="/tasks">My Tasks</Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </>
  );

  // Navigation links for non-authenticated users
  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <nav>
      <h1>TaskNest</h1>
      <ul>
        <li><Link to="/">Home</Link></li> 
        {user ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
