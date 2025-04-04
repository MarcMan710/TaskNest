// This custom hook provides an Axios instance with JWT token and error handling.
import axios from "axios";
import useAuth from "./useAuth";

const useAxios = (baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api") => {
  const { token, logout } = useAuth();  

  const axiosInstance = axios.create({    
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add the token to the headers  
  axiosInstance.interceptors.request.use((config) => {
    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    
    return Promise.reject(error);
  });
  return axiosInstance;
};

export default useAxios;
