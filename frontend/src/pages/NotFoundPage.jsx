// This page shows a message when the user visits an invalid route.
import { Link } from "react-router-dom";
import "../styles/notfound.css";
import Button from "../components/ui/Button";

/**
 * NotFoundPage - Displays a 404 error message for invalid routes.
 * @returns {JSX.Element} The rendered NotFoundPage component.
 */
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2 className="not-found-title">404 - Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you're looking for does not exist.
        </p>
        <Link to="/"><Button className="primary">Go to Home</Button></Link>
      </div>
    </div>
  );
};
  
export default NotFoundPage;
