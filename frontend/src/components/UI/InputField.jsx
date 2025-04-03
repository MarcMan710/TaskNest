// This component is a reusable input field that can be used in various forms.
const InputField = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default InputField;
