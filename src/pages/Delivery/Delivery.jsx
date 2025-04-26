import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deliveryService, driverService } from "../../services/apiDelivery"; // Import deliveryService

export default function Delivery() {
  const [driver, setDriver] = useState();
  const [orders, setOrders] = useState([
    {
      id: 1,
      item: "Pizza",
      status: "Approved",
      customerName: "Vidura",
      customerId: "660c6fa3b3c45f0a7c2e5e7b",
      address: "123 Main Street",
      customerLocation: "37.7749,-122.4194",
      items: ["Pizza", "Burger"],
      restaurantId: "660c6fb8b3c45f0a7c2e5e7c",
      restaurantLocation: "37.7750,-122.4183",
      driver: "Harini",
      driverDetails: null,
      createdBy: "660c6fcfb3c45f0a7c2e5e7d",
    },
    {
      id: 2,
      item: "Burger",
      status: "Approved",
      customerName: "Vidura",
      customerId: "660c6fa3b3c45f0a7c2e5e7b",
      address: "123 Main Street",
      customerLocation: "37.7749,-122.4194",
      items: ["Pizza", "Burger"],
      restaurantId: "660c6fb8b3c45f0a7c2e5e7c",
      restaurantLocation: "37.7750,-122.4183",
      driver: "Harini",
      driverDetails: null,
      createdBy: "660c6fcfb3c45f0a7c2e5e7d",
    },
    {
      id: 3,
      item: "Pasta",
      status: "Approved",
      customerName: "Vidura",
      customerId: "660c6fa3b3c45f0a7c2e5e7b",
      address: "123 Main Street",
      customerLocation: "37.7749,-122.4194",
      items: ["Pizza", "Burger"],
      restaurantId: "660c6fb8b3c45f0a7c2e5e7c",
      restaurantLocation: "37.7750,-122.4183",
      driver: "Harini",
      driverDetails: null,
      createdBy: "660c6fcfb3c45f0a7c2e5e7d",
    },
  ]);

  useEffect(() => {
    driverService
      .findDriverById()
      .then((res) => {
        setDriver(res);
        if (!res) {
          window.location.href = "/driver/login";
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = async (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    try {
      const deliveryData = {
        customerName: order.customerName,
        customerId: order.customerId,
        address: order.address,
        customerLocation: order.customerLocation,
        items: order.items,
        restaurantId: order.restaurantId,
        restaurantLocation: order.restaurantLocation,
        driver: order.driver,
        createdBy: order.createdBy,
      };

      // Call the createDelivery API
      await deliveryService.createDelivery(deliveryData);

      alert(`Order ${id} marked as delivered and saved to the database!`);
      navigate(`/order-confirm/${id}`);
    } catch (error) {
      console.error("Error creating delivery:", error);
      alert("Failed to mark the order as delivered. Please try again.");
    }
  };

  return (
    <div>
        <h1>Driver Data</h1>
        <div>
            Driver Name {driver?.name}
        </div>
      <h1>Approved Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.item} - {order.status}{" "}
            <button onClick={() => handleButtonClick(order.id)}>
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
