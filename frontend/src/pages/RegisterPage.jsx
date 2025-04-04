// This page allows users to sign up.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import authApi from "../api/authApi";
import "../styles/forms.css";

/**
 * RegisterPage - Component for user registration.
 * @returns {JSX.Element} The rendered RegisterPage component.
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * handleRegister - Handles the registration form submission.
   * @param {Event} e - The form submission event.
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages
    try {
      await authApi.register(name, email, password);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister}>
        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Button type="submit" className="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
