// This custom hook automatically adds JWT token to API requests.
import axios from "axios";
import useAuth from "./useAuth";

const useAxios = () => {
  const { token, logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
