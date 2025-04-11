import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const mockMenu = [
  { 
    id: 1, 
    name: "Margherita Pizza", 
    price: 10, 
    description: "Classic cheese and tomato pizza with fresh basil", 
    category: "Pizza",
    image: "/api/placeholder/300/200"
  },
  { 
    id: 2, 
    name: "Pepperoni Pizza", 
    price: 12, 
    description: "Tomato sauce, mozzarella cheese and pepperoni", 
    category: "Pizza",
    image: "/api/placeholder/300/200"
  },
  { 
    id: 3, 
    name: "Signature Burger", 
    price: 8, 
    description: "Angus beef patty with cheese, lettuce, tomato and special sauce",
    category: "Burgers",
    image: "/api/placeholder/300/200"
  },
  { 
    id: 4, 
    name: "Veggie Burger", 
    price: 7, 
    description: "Plant-based patty with avocado and vegan mayo",
    category: "Burgers",
    image: "/api/placeholder/300/200" 
  },
  { 
    id: 5, 
    name: "Spaghetti Carbonara", 
    price: 12, 
    description: "Creamy pasta with bacon, eggs and parmesan",
    category: "Pasta",
    image: "/api/placeholder/300/200" 
  },
  { 
    id: 6, 
    name: "Penne Arrabiata", 
    price: 11, 
    description: "Spicy tomato sauce with garlic and herbs",
    category: "Pasta",
    image: "/api/placeholder/300/200" 
  },
  { 
    id: 7, 
    name: "Caesar Salad", 
    price: 7, 
    description: "Romaine lettuce with croutons, parmesan and Caesar dressing",
    category: "Salads",
    image: "/api/placeholder/300/200" 
  },
  { 
    id: 8, 
    name: "Greek Salad", 
    price: 8, 
    description: "Cucumber, tomato, olives, feta cheese and olive oil dressing",
    category: "Salads",
    image: "/api/placeholder/300/200" 
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...new Set(mockMenu.map(item => item.category))];

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    navigate("/order/checkout", { state: { cartItems } });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const filteredMenu = activeCategory === "All" 
    ? mockMenu 
    : mockMenu.filter(item => item.category === activeCategory);

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
        <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-700">
          Sign Up
        </button>
      </div>
    </nav>
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="p-6 border-b">
                <h2 className="text-3xl font-semibold text-gray-800">Our Menu</h2>
                <p className="text-gray-500 mt-2">Select your favorite dishes and add them to your cart</p>
              </div>
              
              {/* Category Tabs */}
              <div className="flex overflow-x-auto p-2 bg-gray-50">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 mx-1 rounded-md whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-indigo-600 text-white font-medium"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Menu Items */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMenu.map((item) => (
                    <div 
                      key={item.id} 
                      className="border rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          </div>
                          <span className="font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{item.category}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition text-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Your Order</h2>
                <p className="text-gray-500 mt-1">
                  {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} item(s) in cart`}
                </p>
              </div>
              
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="mt-4 text-gray-500">Add some delicious items from our menu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded mr-3"
                            />
                            <div>
                              <h3 className="font-medium text-gray-800">{item.name}</h3>
                              <p className="text-indigo-600 font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg mb-2">
                        <span className="font-medium">Subtotal:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>Delivery fee:</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl mb-6">
                        <span>Total:</span>
                        <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
                      </div>
                      
                      <button 
                        onClick={proceedToCheckout}
                        className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition flex items-center justify-center"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
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

export default Cart;
