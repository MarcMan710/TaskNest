// AuthContext.jsx - Manages user authentication (login, logout, token storage).
import { createContext, useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3000"; // Assuming this is your API base URL

const AuthContext = createContext();

// AuthProvider component to manage authentication state and provide it to children.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Effect to fetch user info when the token changes.
  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  // Function to fetch user information from the server.
  const fetchUser = async (tokenToUse) => {
    try {
      if (!tokenToUse) {
        logout();
        return;
      }
      // Send a request to the server to get user data.
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      // Parse the JSON response.
      const data = await response.json();
      // If the response is successful, update the user state.
      if (response.ok) {
        setUser(data);
      } else if (response.status === 401) {
          logout();
      } else{
          console.error("Error fetching user:", data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  // Function to handle user login.
  const login = (tokenToUse) => {
    // Store the token in local storage and update the token state.
      localStorage.setItem("token", tokenToUse);
      fetchUser(tokenToUse);
  };

  // Function to handle user logout.
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for use in other components.
export default AuthContext;
