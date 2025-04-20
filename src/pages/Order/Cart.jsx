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
            item.restaurantId === restaurantId // Filter by restaurantId
        );
        setMenuItems(approvedItems);

        if (approvedItems.length > 0) {
          const {
            categoryName,
            restaurantName,
            restaurantDescription,
            address,
            phoneNumber,
            email,
            openingTime,
            closingTime,
            menuName,
            menuDescription,
          } = approvedItems[0];
          setRestaurantDetails({
            categoryName,
            restaurantName,
            restaurantDescription,
            address,
            phoneNumber,
            email,
            openingTime,
            closingTime,
            menuName,
            menuDescription,
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

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.categoryName === activeCategory);

  return (
    <div className="font-sans">
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-8 py-16">
          {restaurantDetails && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {restaurantDetails.restaurantName}
              </h2>
              <p className="text-gray-600 text-lg italic mb-4">
                {restaurantDetails.restaurantDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-600">
                  <strong>Category:</strong> {restaurantDetails.categoryName}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {restaurantDetails.address}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {restaurantDetails.phoneNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {restaurantDetails.email || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Opening Hours:</strong> {restaurantDetails.openingTime} -{" "}
                  {restaurantDetails.closingTime}
                </p>
                <p className="text-gray-600">
                  <strong>Menu:</strong> {restaurantDetails.menuName}
                </p>
                <p className="text-gray-600 col-span-2">
                  <strong>Menu Description:</strong> {restaurantDetails.menuDescription}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Menu Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="p-10 border-b">
                  <h2 className="text-4xl font-semibold text-gray-800">
                    Menu Items
                  </h2>
                  <p className="text-gray-500 mt-6 text-lg">
                    Select your favorite dishes and add them to your cart
                  </p>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto p-6 bg-gray-50">
                  {["All", ...new Set(menuItems.map((item) => item.categoryName))].map(
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
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
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
                            onClick={() =>
                              setCartItems([...cartItems, { ...item, instructions: "" }])
                            }
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
            </div>

            {/* Cart Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg sticky top-4">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-gray-800">Your Order</h2>
                  <p className="text-gray-500 mt-4 text-base">
                    {cartItems.length === 0
                      ? "Your cart is empty"
                      : `${cartItems.length} item(s) in cart`}
                  </p>
                </div>

                <div className="p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="mt-6 text-gray-500 text-base">
                        Add some delicious items from our menu
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6 mb-8 max-h-48 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <img
                                src={item.menuItemImage}
                                alt={item.menuItemName}
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <h3 className="font-medium text-base text-gray-800">
                                  {item.menuItemName}
                                </h3>
                                <p className="text-indigo-600 font-medium text-base">
                                  ${item.menuItemPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-500 hover:text-red-700 transition text-base"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <div className="flex justify-between text-base mb-4">
                          <span className="font-medium">Subtotal:</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-6">
                          <span>Delivery fee:</span>
                          <span>$2.99</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mb-8">
                          <span>Total:</span>
                          <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
                        </div>

                        <button
                          onClick={proceedToCheckout}
                          className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition text-base"
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
      <Footer />
    </div>
  );
}

export default Cart;
