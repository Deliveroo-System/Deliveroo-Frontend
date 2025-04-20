import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

// Adjust your backend URL if needed
const socket = io("http://localhost:3000"); // or use your deployed server

const RealTimeListener = () => {
  useEffect(() => {
    // When connected to WebSocket
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
    });

    // When disconnected
    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket server");
    });

    // Listen for new driver event
    socket.on("driverAdded", (driver) => {
      console.log("🧑‍✈️ New driver added:", driver);
      toast.info(`🧑‍✈️ New driver: ${driver?.name || "Unnamed driver"} was added`);
    });

    // Listen for delivery updates
    socket.on("deliveryUpdated", (delivery) => {
      console.log("📦 Delivery updated:", delivery);
      toast.success(`🚚 Delivery ${delivery._id} is now "${delivery.status}"`);
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("driverAdded");
      socket.off("deliveryUpdated");
    };
  }, []);

  return null; // This component only listens, no UI
};

export default RealTimeListener;
