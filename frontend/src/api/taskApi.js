// This file contains CRUD operations for tasks.
import axiosInstance from "./axiosInstance";

const taskApi = {
  async getTasks() {
    const response = await axiosInstance.get("/tasks");
    return response.data; // Array of tasks
  },

  async addTask(task) {
    const response = await axiosInstance.post("/tasks", task);
    return response.data; // New task object
  },

  async updateTask(taskId, updatedTask) {
    const response = await axiosInstance.put(`/tasks/${taskId}`, updatedTask);
    return response.data; // Updated task object
  },

  async deleteTask(taskId) {
    await axiosInstance.delete(`/tasks/${taskId}`);
  },
  async updateTaskStatus(taskId, status) {
    const response = await axiosInstance.put(`/tasks/${taskId}`, { status });
    return response.data;
  },
};

export default taskApi;
