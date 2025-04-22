import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService, userDetailsService } from "../../services/apiOrder";
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";
import { getLoggedInUser } from "../../services/authUtils";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const userDetails = location.state?.userDetails || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/order/login");
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
  const user = getLoggedInUser();

  // Group cart items by name and calculate quantities
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.menuItemName === item.menuItemName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

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

      // Save customer details
      const savedUserDetails = await userDetailsService.createUserDetails(userDetailsPayload);

      // Prepare Order payload
      const orderPayload = {
        customerName: customerDetails.name,
        customerEmail: user?.email,
        foodItems: cartItems.map((item) => ({
          name: item.menuItemName,
          quantity: 1,
          price: item.menuItemPrice,
        })),
        totalPrice: totalPrice + 2.99 + totalPrice * 0.1,
        status: "pending",
      };

      // Save order details
      const savedOrder = await orderService.createOrder(orderPayload);

      // Notify user of success
      alert("Order placed successfully!");
      navigate("/order/restaurant"); // Redirect to restaurant page or order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response?.status === 403) {
        alert("Access denied: insufficient permissions. Please log in again.");
        navigate("/order/login");
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
    <div className="font-sans bg-gradient-to-br  min-h-screen">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8"  >
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Delivery Details */}
            <div className="lg:w-2/3 p-6 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-lg" >
              <h2 className="text-4xl font-bold text-center mb-4">Complete Your Order</h2>
              <p className="text-center mb-8">Review your order and fill in your details below</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center justify-start text-yellow-800">
                    <span className="bg-yellow-200 p-2 rounded-md mr-3">
                      <svg
                        className="w-5 h-5 text-yellow-600"
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
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-black"
                        placeholder="Full Name"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-black"
                        placeholder="Phone Number"
                        required
                      />
                    </div>

                    <textarea
                      name="address"
                      value={customerDetails.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-black"
                      placeholder="Delivery Address"
                      required
                    ></textarea>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={customerDetails.city}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-black"
                        placeholder="City"
                        required
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={customerDetails.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-black"
                        placeholder="ZIP Code"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
<div className="lg:w-2/3 bg-gray-50 p-8 rounded-lg shadow-xl">
  <div className="sticky top-24">
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        Order Summary
      </h3>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex items-center space-x-2 mb-4 text-gray-600 bg-yellow-50 p-3 rounded-lg">
            <svg
              className="w-5 h-5 text-yellow-500"
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
            <span className="text-sm font-medium text-yellow-700 bg-yellow-50">{user?.email}</span>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg space-y-3  text-yellow-700">
          <h4 className="font-medium text-yellow-700">Delivery Details</h4>

{customerDetails.name && (
  <div className="flex items-center text-sm text-yellow-600">
    {/* User Icon */}
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M5.121 17.804A4 4 0 019 16h6a4 4 0 013.879 1.804M12 12a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
    {customerDetails.name}
  </div>
)}

{customerDetails.phone && (
  <div className="flex items-center text-sm text-yellow-600">
    {/* Phone Icon */}
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M3 5a2 2 0 012-2h2l2 4-2 2a16 16 0 006 6l2-2 4 2v2a2 2 0 01-2 2h-1c-7.18 0-13-5.82-13-13V5z" />
    </svg>
    {customerDetails.phone}
  </div>
)}

{customerDetails.address && (
  <div className="flex items-center text-sm text-yellow-600">
    {/* Location Icon */}
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5 9 6.344 9 8s1.344 3 3 3zM12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z" />
    </svg>
    {customerDetails.address}
  </div>
)}

          </div>
        </div>

        {/* Display cart item images below */}
         
             
            <div className="border-t pt-4 space-y-4 max-h-60 overflow-y-auto pr-2 bg-yellow-50 text-yellow-700">
              <h4 className="font-semibold text-lg">Selected Items:</h4>
              {groupedCartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.menuItemImage}
                    alt={item.menuItemName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="text-base font-medium text-yellow-800">
                    {item.menuItemName} (Quantity - {item.quantity})
                  </div>
                </div>
              ))}
            </div>



        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold   text-yellow-700">Total: ${totalPrice.toFixed(2)}</span>
          <button
            onClick={handlePlaceOrder}
            className="bg-yellow-600 text-white py-2 px-6 rounded-md hover:bg-yellow-700"
          >
            Place Order
          </button>
        </div>
      </div>
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
