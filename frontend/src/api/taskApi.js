import API from './axiosInstance';

// ✅ Get All Tasks
export const getTasks = async () => {
  const response = await API.get('/tasks');
  return response.data;
};

// ✅ Create Task
export const createTask = async (taskData) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

// ✅ Update Task
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

// ✅ Delete Task
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
