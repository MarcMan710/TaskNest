import "../../styles/input.css";

/**
 * InputField - A reusable input field component.
 * @param {object} props - The component props.
 * @param {string} props.type - The type of the input field (e.g., "text", "password").
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function to call when the input field's value changes.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.className - Additional CSS classes to apply to the input field.
 * @returns {JSX.Element} The rendered input field component.
 */
const InputField = ({ type = "text", value, onChange, placeholder, className = "" }) => {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`input-field ${className.trim()}`} />
  );
};

export default InputField;
