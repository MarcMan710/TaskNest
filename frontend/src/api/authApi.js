// This file handles Login, Register, and Logout API calls.
import axiosInstance from "./axiosInstance";

const authApi = {
  async login(email, password) {
    const response = await axiosInstance.post("/users/login", { email, password });
    return response.data; 
  },

  async register(name, email, password) {
    const response = await axiosInstance.post("/users/register", { name, email, password });
    return response.data;
  },
};

export default authApi;
