import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaSearch } from "react-icons/fa"; 
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding"; 
 



const mockMenu = [
  { 
    id: 1, 
    name: "Margherita Pizza", 
    price: 10, 
    description: "Classic cheese and tomato pizza with fresh basil", 
    category: "Pizza",
    image: "https://images.pexels.com/photos/18431672/pexels-photo-18431672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
   

  },
  { 
    id: 2, 
    name: "Pepperoni Pizza", 
    price: 12, 
    description: "Tomato sauce, mozzarella cheese and pepperoni", 
    category: "Pizza",
    image: "https://images.pexels.com/photos/30478774/pexels-photo-30478774.jpeg?cs=srgb&dl=pexels-rodrigo-ortega-2044210904-30478774.jpg&fm=jpg"
  
  },
  { 
    id: 3, 
    name: "Signature Burger", 
    price: 8, 
    description: "Angus beef patty with cheese, lettuce, tomato and special sauce",
    category: "Burgers",
    image: "https://images.pexels.com/photos/1552641/pexels-photo-1552641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
 
  },
  { 
    id: 4, 
    name: "Veggie Burger", 
    price: 7, 
    description: "Plant-based patty with avocado and vegan mayo",
    category: "Burgers",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  
  },
  { 
    id: 5, 
    name: "Spaghetti Carbonara", 
    price: 12, 
    description: "Creamy pasta with bacon, eggs and parmesan",
    category: "Pasta",
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  
  },
  { 
    id: 6, 
    name: "Fettuccine Alfredo", 
    price: 11, 
    description: "Spicy tomato sauce with garlic and herbs",
    category: "Pasta",
    image: "https://images.pexels.com/photos/5175578/pexels-photo-5175578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  
  },
  { 
    id: 7, 
    name: "Caesar Salad", 
    price: 7, 
    description: "Romaine lettuce with croutons, parmesan and Caesar dressing",
    category: "Salads",
    image: "https://images.pexels.com/photos/808245/pexels-photo-808245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
 
  },
  { 
    id: 8, 
    name: "Caprese Salad", 
    price: 8, 
    description: "Cucumber, tomato, olives, feta cheese and olive oil dressing",
    category: "Salads",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
 
  },
  { 
    id: 9, 
    name: "Lemonade", 
    price: 3, 
    description: "Freshly squeezed lemonade with mint", 
    category: "Drinks", 
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  { 
    id: 10, 
    name: "Iced Coffee", 
    price: 4, 
    description: "Chilled coffee with milk and ice", 
    category: "Drinks", 
    image: "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  { 
    id: 11, 
    name: "Orange Juice", 
    price: 3.5, 
    description: "Fresh orange juice served cold", 
    category: "Drinks", 
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  } ,
  
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...new Set(mockMenu.map(item => item.category))];

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, instructions: "" }]);
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
    <NavBar />
    <div
  className="min-h-screen bg-gray-50"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Reduced opacity from 0.7 to 0.5
      zIndex: -1,  
    }}
  ></div> 
              

      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12"
      >
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
     <br></br>
            
              
             <Footer /> 
    </div>
  );
}

export default Cart;
