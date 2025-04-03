import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaTimes, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Dummy data with valid food images
    const data = [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza with fresh basil.",
        price: 12.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1548365328-76bc3997d9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 2,
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with pancetta and parmesan cheese.",
        price: 15.49,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 3,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing and croutons.",
        price: 9.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1512058564366-c9e8b6d6a477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 4,
        name: "Grilled Chicken",
        description: "Juicy grilled chicken with herbs and spices.",
        price: 14.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 5,
        name: "Cheeseburger",
        description: "Classic cheeseburger with lettuce and tomato.",
        price: 11.49,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 6,
        name: "Sushi Platter",
        description: "Assorted sushi rolls with fresh fish and vegetables.",
        price: 24.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e4f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 7,
        name: "Tacos",
        description: "Soft tacos filled with seasoned meat and fresh toppings.",
        price: 10.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601924582975-4d3b3b1b7f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 8,
        name: "Pancakes",
        description: "Fluffy pancakes served with syrup and fresh berries.",
        price: 8.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587731504627-1fd3c2d7a3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 9,
        name: "Steak",
        description: "Grilled steak cooked to perfection with a side of vegetables.",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
      {
        id: 10,
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream topped with chocolate syrup and nuts.",
        price: 6.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1599785209707-28a9b2c5b9b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      },
    ];
    setCartItems(data);
    calculateSubtotal(data);
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total.toFixed(2));
  };

  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

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

      {/* Cart Items */}
      <div className="bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">Restaurant Cart</h1>
        <p className="text-center text-gray-600 mt-2">Review your selected items and proceed to checkout.</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                  <p className="text-lg font-bold text-gray-800 mt-4">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Your cart is empty. Add some delicious food!</p>
        )}
      </div>

      {/* Subtotal and Checkout */}
      {cartItems.length > 0 && (
        <div className="bg-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Subtotal: ${subtotal}</h2>
            <button
              onClick={() => navigate("/order/checkout", { state: { cartItems, subtotal } })} // Pass cart details
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

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

export default Cart;
