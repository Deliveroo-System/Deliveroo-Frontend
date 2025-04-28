import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId } = location.state || {};

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
            item.menuItemIsAvailable &&
            item.restaurantId === restaurantId
        );
        setMenuItems(approvedItems);

        if (approvedItems.length > 0) {
          const {
            restaurantName,
            restaurantDescription,
            address,
            phoneNumber,
            email,
            openingTime,
            closingTime,
          } = approvedItems[0];
          setRestaurantDetails({
            restaurantName,
            restaurantDescription,
            address,
            phoneNumber,
            email,
            openingTime,
            closingTime,
          });
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  const generateDynamicCategories = (menuItems) => {
    const categories = {};

    menuItems.forEach((item) => {
      let category = "Others";
      if (
        item.menuItemName.toLowerCase().includes("drink") ||
        item.menuItemName.toLowerCase().includes("coffee")
      ) {
        category = "Drinks";
      } else if (item.menuItemName.toLowerCase().includes("burger")) {
        category = "Burgers";
      } else if (item.menuItemName.toLowerCase().includes("salad")) {
        category = "Salads";
      } else if (
        item.menuItemName.toLowerCase().includes("sandwich") ||
        item.menuItemName.toLowerCase().includes("wrap")
      ) {
        category = "Sandwiches";
      } else if (item.menuItemName.toLowerCase().includes("pizza")) {
        category = "Pizza";
      } else if (
        item.menuItemName.toLowerCase().includes("breakfast") ||
        item.menuItemName.toLowerCase().includes("egg") ||
        item.menuItemName.toLowerCase().includes("toast")
      ) {
        category = "Breakfast";
      } else if (
        item.menuItemName.toLowerCase().includes("dinner") ||
        item.menuItemName.toLowerCase().includes("steak") ||
        item.menuItemName.toLowerCase().includes("fish") ||
        item.menuItemName.toLowerCase().includes("ribs")
      ) {
        category = "Dinner";
      } else if (
        item.menuItemName.toLowerCase().includes("dessert") ||
        item.menuItemName.toLowerCase().includes("cake") ||
        item.menuItemName.toLowerCase().includes("ice cream")
      ) {
        category = "Desserts";
      }

      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    return categories;
  };

  const categorizedMenuItems = generateDynamicCategories(menuItems);
  const allCategories = ["All", ...Object.keys(categorizedMenuItems)];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : categorizedMenuItems[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Restaurant Header */}
      {restaurantDetails && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {restaurantDetails.restaurantName}
                </h1>
                <p className="mt-2 text-gray-600">
                  {restaurantDetails.restaurantDescription}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {restaurantDetails.address}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {restaurantDetails.phoneNumber}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {restaurantDetails.openingTime} -{" "}
                    {restaurantDetails.closingTime}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80"
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="lg:w-2/3">
            {/* Category Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
                    <div
                      key={item.menuItemId}
                      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={item.menuItemImage}
                          alt={item.menuItemName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.menuItemName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.menuItemDescription}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            ${item.menuItemPrice.toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              setCartItems([
                                ...cartItems,
                                { ...item, instructions: "" },
                              ])
                            }
                            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-500">
                    No menu items found in this category
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Order
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {cartItems.length === 0
                    ? "Your cart is empty"
                    : `${cartItems.length} item(s)`}
                </p>
              </div>

              {cartItems.length > 0 ? (
                <>
                  <div className="p-6 max-h-96 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <li key={index} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={item.menuItemImage}
                                alt={item.menuItemName}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-900">
                                  {item.menuItemName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  ${item.menuItemPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Delivery fee
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          $2.99
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-base font-medium text-gray-900">
                          Total
                        </span>
                        <span className="text-base font-medium text-gray-900">
                          ${(calculateTotal() + 2.99).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={proceedToCheckout}
                      className="mt-6 w-full bg-gray-900 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Add items to your cart</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Secure Payment
              </h3>
              <p className="mt-1 text-sm text-gray-500">SSL Encrypted</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Fast Delivery
              </h3>
              <p className="mt-1 text-sm text-gray-500">30-45 minutes</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Quality Guarantee
              </h3>
              <p className="mt-1 text-sm text-gray-500">Fresh ingredients</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                24/7 Support
              </h3>
              <p className="mt-1 text-sm text-gray-500">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
