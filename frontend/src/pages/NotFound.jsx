import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
