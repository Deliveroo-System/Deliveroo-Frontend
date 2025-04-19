import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios"; // Import axios for API calls
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null); // Track selected restaurant
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state?.userDetails;

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    navigate("/order/checkout", { state: { cartItems } });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.menuItemPrice, 0);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/Restaurant/get-all-restaurant-menuitems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const approvedItems = response.data.filter(
          (item) =>
            item.restarantsIsApproved &&
            item.restarantsIsAvailable &&
            item.menuIsAvailable &&
            item.menuItemIsAvailable
        );
        setMenuItems(approvedItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Group menu items by restaurant
  const groupedRestaurants = menuItems.reduce((acc, item) => {
    const restaurantId = item.restaurantId;
    if (!acc[restaurantId]) {
      acc[restaurantId] = {
        restaurantName: item.restaurantName,
        restaurantDescription: item.restaurantDescription,
        items: [],
      };
    }
    acc[restaurantId].items.push(item);
    return acc;
  }, {});

  const handleRestaurantClick = (restaurantId) => {
    setActiveRestaurant(restaurantId);
    setActiveCategory("All"); // Reset category when switching restaurants
  };

  const filteredItems =
    activeCategory === "All"
      ? groupedRestaurants[activeRestaurant]?.items || []
      : groupedRestaurants[activeRestaurant]?.items.filter(
          (item) => item.categoryName === activeCategory
        );

  const categorizedMenuItems = filteredItems.reduce((acc, item) => {
    const menuName = item.menuName || "Others";
    if (!acc[menuName]) {
      acc[menuName] = [];
    }
    acc[menuName].push(item);
    return acc;
  }, {});

  return (
    <div className="font-sans">
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: -1,
          }}
        ></div>

        {userDetails && (
          <div className="p-4 bg-white shadow-md rounded-md mb-4">
            <h2 className="text-xl font-semibold">Welcome, {userDetails.name}!</h2>
            <p className="text-gray-600">Email: {userDetails.email}</p>
          </div>
        )}

        <div className="max-w-8xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Restaurant List */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-10">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">Restaurants</h2>
                <ul className="space-y-8">
                  {Object.entries(groupedRestaurants).map(([id, restaurant]) => (
                    <li
                      key={id}
                      className={`p-8 rounded-lg cursor-pointer ${
                        activeRestaurant === id
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleRestaurantClick(id)}
                    >
                      <h3 className="font-bold text-xl">{restaurant.restaurantName}</h3>
                      <p className="text-base">{restaurant.restaurantDescription}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Menu Section */}
            <div className="lg:w-2/3">
              {activeRestaurant && (
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="p-10 border-b">
                    <h2 className="text-4xl font-semibold text-gray-800">
                      Menu for {groupedRestaurants[activeRestaurant]?.restaurantName}
                    </h2>
                    <p className="text-gray-500 mt-6 text-lg">
                      Select your favorite dishes and add them to your cart
                    </p>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex overflow-x-auto p-6 bg-gray-50">
                    {["All", ...new Set(groupedRestaurants[activeRestaurant]?.items.map((item) => item.categoryName))].map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-8 py-4 mx-3 rounded-lg whitespace-nowrap ${
                            activeCategory === category
                              ? "bg-indigo-600 text-white font-medium"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      )
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="p-10">
                    {Object.entries(categorizedMenuItems).map(([menuName, items]) => (
                      <div key={menuName} className="mb-16">
                        <h3 className="text-3xl font-bold text-gray-800 mb-8">{menuName}</h3>
                        <div className="grid md:grid-cols-2 gap-12">
                          {items.map((item) => (
                            <div
                              key={item.menuItemId}
                              className="border rounded-lg overflow-hidden hover:shadow-xl transition"
                            >
                              <div className="h-64 overflow-hidden">
                                <img
                                  src={item.menuItemImage}
                                  alt={item.menuItemName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-8">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-xl text-gray-800">
                                      {item.menuItemName}
                                    </h3>
                                    <p className="text-base text-gray-500 mt-4">
                                      {item.menuItemDescription}
                                    </p>
                                  </div>
                                  <span className="font-bold text-indigo-600 text-lg">
                                    ${item.menuItemPrice.toFixed(2)}
                                  </span>
                                </div>
                                <div className="mt-8 flex justify-between items-center">
                                  <span className="text-sm px-4 py-2 bg-gray-100 rounded-full text-gray-600">
                                    {item.categoryName}
                                  </span>
                                  <button
                                    onClick={() => setCartItems([...cartItems, { ...item, instructions: "" }])}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition text-base"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Section */}
            {activeRestaurant && (
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg sticky top-4">
                  <div className="p-10 border-b">
                    <h2 className="text-3xl font-semibold text-gray-800">Your Order</h2>
                    <p className="text-gray-500 mt-6 text-lg">
                      {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} item(s) in cart`}
                    </p>
                  </div>

                  <div className="p-10">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-16">
                        <svg
                          className="w-24 h-24 mx-auto text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <p className="mt-8 text-gray-500 text-lg">Add some delicious items from our menu</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-8 mb-10 max-h-80 overflow-y-auto">
                          {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <img
                                  src={item.menuItemImage}
                                  alt={item.menuItemName}
                                  className="w-24 h-24 object-cover rounded-lg mr-6"
                                />
                                <div>
                                  <h3 className="font-medium text-lg text-gray-800">{item.menuItemName}</h3>
                                  <p className="text-indigo-600 font-medium text-lg">${item.menuItemPrice.toFixed(2)}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(index)}
                                className="text-red-500 hover:text-red-700 transition text-lg"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-8">
                          <div className="flex justify-between text-xl mb-6">
                            <span className="font-medium">Subtotal:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg text-gray-500 mb-8">
                            <span>Delivery fee:</span>
                            <span>$2.99</span>
                          </div>
                          <div className="flex justify-between font-bold text-2xl mb-10">
                            <span>Total:</span>
                            <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
                          </div>

                          <button
                            onClick={proceedToCheckout}
                            className="w-full bg-green-600 text-white py-5 rounded-lg font-medium hover:bg-green-700 transition text-xl"
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
