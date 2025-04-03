// This component is a reusable button component that can be used throughout the application.
import "../../styles/buttons.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
