import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService } from "../../services/apiOrder";
import { jwtDecode } from "jwt-decode";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import chechImg from "../../assets/img/checkOut.png";
import back from "../../assets/img/checkout_2.png"; 

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
    <div className="font-sans">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-normal text-black">
          Deliveroo <span className="font-bold">FOOD</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-black-600">
            Login
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
            Sign Up
          </button>
        </div>
      </nav>

      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        style={{
          //backgroundImage: `url(${back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          {/* Order Details Section */}
          <div className="w-1/2 pr-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Checkout</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Order Summary</h3>

              <div className="bg-gray-50 p-4 rounded-md mb-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 italic">Your cart is empty</p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <div key={index} className="py-3 flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-700">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md font-bold">
                <span>Total</span>
                <span className="text-xl text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Customer Information</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="mb-2">
                  <span className="font-medium text-gray-500">Name: </span>
                  <span>{userName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Email: </span>
                  <span>{userEmail}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Place Order
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="w-full mt-3 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Return to Cart
            </button>
          </div>

          {/* Image Section */}
          <div className="w-1/2">
            <img
              src={chechImg}
              alt="Checkout"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

    
         {/* Footer Section */}
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1 - Logo & Social */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">Deliveroo</span>
            </div>
            <p className="text-gray-400 mb-6">
              Order your favorite food from local restaurants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
    
          {/* Column 2 - Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
            </ul>
          </div>
    
          {/* Column 3 - Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Restaurants</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Restaurant Login</a></li>
            </ul>
          </div>
    
          {/* Column 4 - App Download */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get the App</h3>
            <div className="space-y-4">
              <a href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" 
                  alt="App Store" 
                  className="h-12 w-auto"
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" 
                  alt="Google Play" 
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </div>
          
        </div>
        
      
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Deliveroo. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
        </div>
      );
    }

export default Checkout;
