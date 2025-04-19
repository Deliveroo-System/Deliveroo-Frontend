import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService, userDetailsService } from "../../services/apiOrder";
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";
import chechImg from "../../assets/img/back.png";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const userDetails = location.state?.userDetails || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
    }
  }, [navigate]);

  const [customerDetails, setCustomerDetails] = useState({
    name: userDetails.name || "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.menuItemPrice || 0), 0);

  const handlePlaceOrder = async () => {
    try {
      const userDetailsPayload = {
        customerName: customerDetails.name,
        phoneNumber: customerDetails.phone,
        address: customerDetails.address,
        city: customerDetails.city,
        zipCode: customerDetails.zipCode,
        items: cartItems.map((item) => ({
          name: item.menuItemName,
          qty: 1,
          price: item.menuItemPrice,
        })),
        totalAmount: totalPrice + 2.99 + totalPrice * 0.1,
        status: "Pending",
      };

      console.log("UserDetails Payload:", userDetailsPayload);

      // Save customer details
      const savedUserDetails = await userDetailsService.createUserDetails(userDetailsPayload);
      console.log("Saved User Details:", savedUserDetails);

      // Prepare Order payload
      const orderPayload = {
        customerName: customerDetails.name,
        customerEmail: userDetails.email,
        foodItems: cartItems.map((item) => ({
          name: item.menuItemName,
          quantity: 1,
          price: item.menuItemPrice,
        })),
        totalPrice: totalPrice + 2.99 + totalPrice * 0.1,
        status: "pending",
      };

      console.log("Order Payload:", orderPayload);

      // Save order details
      const savedOrder = await orderService.createOrder(orderPayload);
      console.log("Saved Order:", savedOrder);

      // Notify user of success
      alert("Order placed successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response?.status === 403) {
        alert("Access denied: insufficient permissions. Please log in again.");
        navigate("/login");
      } else {
        alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Delivery Details */}
            <div className="lg:w-2/3 p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Complete Your Order
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Please review your order and fill in your details
                  </p>
                </div>

                {/* Delivery Details Form */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    Delivery Details
                  </h3>

                  <div className="grid gap-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Full Name"
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your delivery address"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={customerDetails.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={customerDetails.zipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter ZIP code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:w-1/3 bg-gray-50 p-8">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-4 text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium">{userDetails.email}</span>
                      </div>

                      {/* Delivery Details Summary */}
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <h4 className="font-medium text-gray-700">Delivery Details</h4>
                        {customerDetails.name && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {customerDetails.name}
                          </div>
                        )}
                        {customerDetails.address && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {customerDetails.address}
                          </div>
                        )}
                        {customerDetails.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {customerDetails.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>${(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">
                          ${(totalPrice + 2.99 + totalPrice * 0.1).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Place Order</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
