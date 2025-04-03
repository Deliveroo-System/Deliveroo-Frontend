import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate hook
  const { cartItems, subtotal } = location.state || { cartItems: [], subtotal: 0 };

  return (
    <div className="font-sans">
      {/* Header */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-normal text-black">
          Deliveroo <span className="font-bold">FOOD</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-black-600">Login</button>
          <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">Checkout</h1>
        <p className="text-center text-gray-600 mt-2">Review your order and confirm payment.</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
              <p className="text-2xl font-bold text-gray-800">${subtotal}</p>
            </div>
            <button
              onClick={() => navigate("/order/payment", { state: { cartItems, subtotal } })} // Navigate to Payment
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Confirm Order
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No items in your cart.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">Deliveroo</span>
              </div>
              <p className="text-gray-400 mb-6">Order your favorite food from local restaurants.</p>
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
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">For Restaurants</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Partner With Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Business Account</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Restaurant Login</a></li>
              </ul>
            </div>
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
};

export default Checkout;
