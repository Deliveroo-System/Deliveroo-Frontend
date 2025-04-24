import axios from "axios";
import { io } from "socket.io-client";

// Axios Setup
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
  timeout: 10000, // 10-second timeout
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("driverToken") || localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Error interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("driverToken");
      window.location.href = "/delivery/login";
    }
    return Promise.reject(error);
  }
);

// WebSocket Setup with auto-reconnect
const socket = io(process.env.REACT_APP_WS_URL || "http://localhost:3000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  auth: (cb) => {
    cb({ token: localStorage.getItem("driverToken") });
  }
});

// Delivery-specific API methods
export const deliveryAPI = {
  // Driver Authentication
  login: (credentials) => API.post("/auth/login/driver", credentials),
  
  // Delivery Management
  getAssignedDeliveries: () => API.get("/deliveries/assigned"),
  updateDeliveryStatus: (deliveryId, status) => 
    API.put(`/deliveries/${deliveryId}/status`, { status }),
  
  // Location Updates
  updateDriverLocation: (coordinates) => 
    API.put("/drivers/location", { coordinates }),
};

// WebSocket methods
export const deliverySocket = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  
  // Join/leave order room
  joinOrderRoom: (orderId) => socket.emit("joinOrder", orderId),
  leaveOrderRoom: (orderId) => socket.emit("leaveOrder", orderId),
  
  // Location updates
  sendLocationUpdate: (data) => socket.emit("locationUpdate", data),
  
  // Event listeners
  onDriverLocation: (callback) => {
    socket.on("driverLocation", callback);
    return () => socket.off("driverLocation", callback);
  },
  onOrderStatusUpdate: (callback) => {
    socket.on("orderStatusUpdate", callback);
    return () => socket.off("orderStatusUpdate", callback);
  }
};

// Export for legacy usage
export { API, socket };