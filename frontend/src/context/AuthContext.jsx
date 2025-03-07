import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/authApi';

// ✅ Create Context
export const AuthContext = createContext();

// ✅ Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // ✅ Handle Login
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
    }
  };

  // ✅ Handle Register
  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message);
    }
  };

  // ✅ Handle Logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
