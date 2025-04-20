import { io } from "socket.io-client";

// Connect to your backend
const socket = io("http://localhost:3000"); // 🔁 Change to your backend URL if deployed

export default socket;
