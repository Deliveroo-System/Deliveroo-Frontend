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
  const deliveryFee = 2.99;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + deliveryFee + tax;
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
    <div className="font-sans min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10 ">
          <h1 className="text-4xl font-extrabold tracking-tight text-yellow-900 sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-purple-600">
              Checkout
            </span>
          </h1>
          <p className="mt-2 text-lg text-yellow-600">Complete your order in just a few steps</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left Section - Delivery Details */}
            <div className="p-8 lg:col-span-3 bg-gradient-to-r from-yellow-300 to-yellow-500">
              <div className="max-w-lg mx-auto">
                {/* Progress Steps */}
                 
                 {/* Progress Steps */}
             <div className="flex justify-between mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <span className="mt-2 text-xs font-medium text-white">Cart</span>
                  </div>
                  <div className="w-full border-t-2 border-white my-auto mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <span className="mt-2 text-xs font-medium text-white">Details</span>
                  </div>
                  <div className="w-full border-t-2 border-white my-auto mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-yellow-600 font-bold">3</div>
                    <span className="mt-2 text-xs font-medium text-white">Confirmation</span>
                  </div></div>

                {/* Form Section */}
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-bold flex items-center space-x-2 text-white mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Contact Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="text-xs font-medium text-white ml-3 mb-1 block">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={customerDetails.name}
                          onChange={handleInputChange}
                          className="w-full p-4 pl-12 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder="John Smith"
                          required
                        />
                        <div className="absolute left-4 bottom-4 text-yellow-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="text-xs font-medium text-white ml-3 mb-1 block">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          className="w-full p-4 pl-12 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder="(123) 456-7890"
                          required
                        />
                        <div className="absolute left-4 bottom-4 text-yellow-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Address */}
                  <div>
                    <h3 className="text-xl font-bold flex items-center space-x-2 text-white mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Delivery Address</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <label className="text-xs font-medium text-white ml-3 mb-1 block">Street Address</label>
                        <textarea
                          name="address"
                          value={customerDetails.address}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full p-4 pl-12 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder="123 Main Street, Apt 4B"
                          required
                        ></textarea>
                        <div className="absolute left-4 top-9 text-yellow-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="text-xs font-medium text-white ml-3 mb-1 block">City</label>
                          <input
                            type="text"
                            name="city"
                            value={customerDetails.city}
                            onChange={handleInputChange}
                            className="w-full p-4 pl-12 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            placeholder="New York"
                            required
                          />
                          <div className="absolute left-4 bottom-4 text-yellow-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label className="text-xs font-medium text-white ml-3 mb-1 block">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={customerDetails.zipCode}
                            onChange={handleInputChange}
                            className="w-full p-4 pl-12 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            placeholder="10001"
                            required
                          />
                          <div className="absolute left-4 bottom-4 text-yellow-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="p-8 lg:col-span-2 bg-gray-900 text-white">
              <div className="max-w-lg mx-auto">
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Order Summary</span>
                </h3>
                
                {/* Customer Email */}
                <div className="flex items-center mb-6 bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 w-full">
                    <div className="p-2 bg-yellow-500 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm truncate">{user?.email}</span>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Your Items</h4>
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
                    {groupedCartItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg">
                        <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-indigo-500">
                          <img
                            src={item.menuItemImage}
                            alt={item.menuItemName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">{item.menuItemName}</h5>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                            <span className="text-yellow-400">${(item.menuItemPrice * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span className="text-yellow-400">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-8 bg-yellow-600 text-white py-4 px-6 rounded-xl hover:bg-yellow-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complete Order</span>
                  </div>
                </button>
                
                <p className="text-xs text-center text-yellow-300 mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> <div>
       {/* Trust Badges */}
       <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3 border border-yellow-100">
            <div className="p-2 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-orange-900 text-sm">Secure Payment</h4>
              <p className="text-xs text-orange-700">SSL Encrypted</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3 border border-yellow-100">
            <div className="p-2 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-orange-900 text-sm">Fast Delivery</h4>
              <p className="text-xs text-orange-700">30-45 minutes</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3 border border-yellow-100">
            <div className="p-2 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-orange-900 text-sm">Quality Guarantee</h4>
              <p className="text-xs text-orange-700">Fresh ingredients</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-3 border border-yellow-100">
            <div className="p-2 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-orange-900 text-sm">24/7 Support</h4>
              <p className="text-xs text-orange-700">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <br></br>
      
      <Footer />
    </div>
  );
}

export default Checkout;