import axios from "axios";
import { io } from "socket.io-client";

// Axios Setup
const API = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// WebSocket Setup
const socket = io("http://localhost:3000"); // Replace with your backend URL

// Example Usage of Axios
export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response?.data || error.message);
    throw error;
  }
};

// Example Usage of WebSocket
export const setupSocketListeners = (event, callback) => {
  socket.on(event, callback);

  // Cleanup listener
  return () => {
    socket.off(event);
  };
};

export { API, socket };