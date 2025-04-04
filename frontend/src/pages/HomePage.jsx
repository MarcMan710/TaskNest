// HomePage.jsx - Landing page for TaskNest, welcoming users and offering login/register options.
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/homepage.css"; // Import the CSS file for styling
import Button from "../components/ui/Button";

/**
 * HomePage - The landing page component.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to TaskNest</h1>
        <p className="homepage-subtitle">
          Your all-in-one solution for task management.
        </p>
        <div className="homepage-actions">
          {user ? (
            <Link to="/tasks">
              <Button className="primary">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login"><Button className="secondary">Login</Button></Link>
              <Link to="/register"><Button className="primary">Register</Button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
