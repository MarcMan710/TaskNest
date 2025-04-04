// Button.jsx
// Reusable button component with enhanced styling and flexibility.
import "../../styles/buttons.css";

/**
 * Button - A reusable button component.
 * @param {object} props - The component props.
 * @param {string} props.children - The text or elements to display inside the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.className - Additional CSS classes to apply to the button.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({ children, onClick, className = "" }) => {
  return (
    <button className={`btn ${className.trim()}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
