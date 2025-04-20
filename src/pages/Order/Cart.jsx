import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";
import 'animate.css';


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
    <div className="font-sans bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
  <NavBar />
  <div className="max-w-7xl mx-auto px-8 py-16">
    {restaurantDetails && (
      <div className="bg-gradient-to-r from-green-300 to-green-480 rounded-3xl p-10 mb-12 shadow-xl border-t-4 border-green-600 animate__animated animate__fadeIn animate__delay-1s">
        <h2 className="text-6xl font-extrabold text-white mb-6 text-center animate__animated animate__fadeIn animate__delay-2s font-serif">
          {restaurantDetails.restaurantName}
        </h2>
        <p className="text-white text-lg italic mb-8 text-center animate__animated animate__fadeIn animate__delay-3s font-serif">
          {restaurantDetails.restaurantDescription}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-white">
          <div className="flex flex-col">
            
            <p className="animate__animated animate__fadeIn animate__delay-4s">
              <span className="font-semibold text-white">Address:</span> {restaurantDetails.address}
            </p>
            <p className="animate__animated animate__fadeIn animate__delay-4s">
              <span className="font-semibold text-white">Phone:</span> {restaurantDetails.phoneNumber}
            </p>
            <p className="animate__animated animate__fadeIn animate__delay-4s">
              <span className="font-semibold text-white">Email:</span> {restaurantDetails.email || "N/A"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="animate__animated animate__fadeIn animate__delay-4s">
              <span className="font-semibold text-white">Opening Hours:</span> {restaurantDetails.openingTime} - {restaurantDetails.closingTime}
            </p>
             
             
          </div>
        </div>
      </div>
    )}

</div>
<div className="max-w-8xl mx-auto px-14">
  {/* Flex container for Menu Section and Cart Section */}
  <div className="flex justify-between space-x-8"> {/* Added space-x-8 for horizontal spacing */}
    {/* Menu Section */}
    <div className="lg:w-3/4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
        <div className="p-10 border-b border-gray-200 bg-indigo-50 rounded-t-3xl">
          <h2 className="text-4xl font-semibold text-gray-800">Menu Items</h2>
          <p className="text-gray-500 mt-3 text-lg">Select your favorite dishes and add them to your cart</p>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto p-4 bg-white border-b border-gray-100">
            {["All", ...new Set(menuItems.map((item) => item.categoryName))].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 mx-2 text-sm rounded-full transition duration-300 ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.menuItemId}
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={item.menuItemImage}
                    alt={item.menuItemName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-2xl text-gray-800">
                      {item.menuItemName}
                    </h3>
                    <p className="text-gray-500 mt-3 text-sm">{item.menuItemDescription}</p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-indigo-600 text-xl font-semibold">${item.menuItemPrice.toFixed(2)}</span>
                    <button
                      onClick={() =>
                        setCartItems([...cartItems, { ...item, instructions: "" }])
                      }
                      className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
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
      <div className="lg:w-2/3 p-6 bg-gradient-to-r from-green-300 to-green-500 text-white rounded-lg sticky top-4">
        <h2 className="text-2xl font-bold mb-2">Your Order</h2>
        <p className="mb-4">
          {cartItems.length === 0
            ? "Your cart is empty"
            : `${cartItems.length} item(s) in cart`}
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-green-100">
            <p>Add some delicious items from our menu</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-green-200 bg-opacity-30 border border-green-100"
                >
                  <div className="flex items-center">
                    <img
                      src={item.menuItemImage}
                      alt={item.menuItemName}
                      className="w-14 h-14 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{item.menuItemName}</h4>
                      <span className="text-sm font-semibold">${item.menuItemPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-100 text-sm hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-green-100 pt-4">
              <div className="flex justify-between font-medium text-base mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span>Delivery fee:</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total:</span>
                <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
              </div>

              <button
                onClick={proceedToCheckout}
                className="w-full bg-white text-green-700 hover:bg-green-100 py-3 rounded-full text-base font-medium transition"
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



       
      <Footer />
    </div>
  );
}

export default Cart;
