// authApi.js
import useAxios from "../hooks/useAxios";

const AuthApi = () => {
  const axiosInstance = useAxios();

  const login = async (email, password) => {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    // Assuming the backend sends the token in the response data
    const token = response.data.token;
    localStorage.setItem("token", token); // Save the token
    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await axiosInstance.post("/users/register", {
      username,
      email,
      password,
    });
    return response.data;
  };
  return { login, register };
};

export default AuthApi;
