import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService } from "../../services/apiOrder";
import { jwtDecode } from "jwt-decode";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const cartItems = location.state?.cartItems || [];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      setUserName(decoded.email.split("@")[0]);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log("Cart items in checkout page:", cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    try {
      console.log("Sending order:", {
        customerName: userName,
        customerEmail: userEmail,
        foodItems: cartItems,
        totalPrice,
      });

      await orderService.createOrder({
        customerName: userName,
        customerEmail: userEmail,
        foodItems: cartItems,
        totalPrice,
      });

      setTimeout(() => {
        alert("Order placed successfully!");
        navigate("/cart");
      }, 300); // Delay to allow console log to show
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price}
        </div>
      ))}
      <h3>Total: ${totalPrice}</h3>
      <button
        onClick={() => {
          console.log("Button clicked!");
          handlePlaceOrder();
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
