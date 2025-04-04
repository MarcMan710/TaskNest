// This page allows users to log in.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import authApi from "../api/authApi";
import useAuth from "../hooks/useAuth";
import "../styles/forms.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await authApi.login(email, password);
      login(token);
      navigate("/tasks");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit" className="primary">
          Login
        </Button>
      </form>


    </div>
  );
};

export default LoginPage;
