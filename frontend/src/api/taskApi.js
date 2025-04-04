// taskApi.js
const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API base URL

const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const taskApi = {
  getTasks,
};

export default taskApi;
