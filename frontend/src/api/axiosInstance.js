import axios from 'axios';

// ✅ Base API configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
