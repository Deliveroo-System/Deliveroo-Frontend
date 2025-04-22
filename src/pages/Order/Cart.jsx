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

  const generateDynamicCategories = (menuItems) => {
    const categories = {};

    menuItems.forEach((item) => {
      let category = "Others"; // Default category
      if (item.menuItemName.toLowerCase().includes("drink") || item.menuItemName.toLowerCase().includes("coffee")) {
        category = "Drinks";
      } else if (item.menuItemName.toLowerCase().includes("burger")) {
        category = "Burgers";
      } else if (item.menuItemName.toLowerCase().includes("salad")) {
        category = "Salads";
      } else if (item.menuItemName.toLowerCase().includes("sandwich") || item.menuItemName.toLowerCase().includes("wrap")) {
        category = "Sandwiches";
      } else if (item.menuItemName.toLowerCase().includes("pizza")) {
        category = "Pizza";
      } else if (item.menuItemName.toLowerCase().includes("breakfast") || item.menuItemName.toLowerCase().includes("egg") || item.menuItemName.toLowerCase().includes("toast")) {
        category = "Breakfast";
      } else if (item.menuItemName.toLowerCase().includes("dinner") || item.menuItemName.toLowerCase().includes("steak") || item.menuItemName.toLowerCase().includes("fish") || item.menuItemName.toLowerCase().includes("ribs")) {
        category = "Dinner";
      } else if (item.menuItemName.toLowerCase().includes("dessert") || item.menuItemName.toLowerCase().includes("cake") || item.menuItemName.toLowerCase().includes("ice cream")) {
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

  // Combine all categories into a single list for tabs
  const allCategories = ["All", "Fine Dining", ...Object.keys(categorizedMenuItems)];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : activeCategory === "Fine Dining"
      ? menuItems.filter((item) => item.categoryName === "Fine Dining")
      : categorizedMenuItems[activeCategory] || [];

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
    <NavBar />
    
   
   {/* Menu Section */}
{restaurantDetails && (
  <div className="p-5 mb-6 animate__animated animate__fadeIn animate__delay-1s"> {/* Reduced padding and margin */}
    <h2 className="text-6xl font-extrabold text-yellow-600 mb-3 font-serif" // Reduced margin
      style={{
        position: "absolute",
        top: "px",
        whiteSpace: "nowrap",
        animation: "moveText 10s linear infinite"
      }}
    >
      {restaurantDetails.restaurantName}
    </h2>

    <style>
      {`
        @keyframes moveText {
          0% { left: 100%; }
          100% { left: -100%; }
        }
      `}
    </style>


    <div className="text-base text-yellow" style={{ position: "relative", top: "10px" , left:"3%" }}> 
    <p className="text-yellow-800 text-lg italic justify-center  py-16 animate__animated animate__fadeIn animate__delay-1s font-serif" style={{ fontSize: "38px", position: "relative" , top: "100px" , marginLeft: "24%"  }}>  
      {restaurantDetails.restaurantDescription}
    </p> 
      <div className="flex flex-col">
        <p className="animate__animated animate__fadeIn animate__delay-2s">
          <span className="font-semibold text-yellow-700">Address:</span> {restaurantDetails.address}
        </p>
        <p className="animate__animated animate__fadeIn animate__delay-2s">
          <span className="font-semibold text-yellow-700">Phone:</span> {restaurantDetails.phoneNumber}
        </p>
        <p className="animate__animated animate__fadeIn animate__delay-2s">
          <span className="font-semibold text-yellow-700">Email:</span> {restaurantDetails.email || "N/A"}
        </p>
      </div>

      <div className="flex flex-col">
        <p className="animate__animated animate__fadeIn animate__delay-2s">
          <span className="font-semibold text-yellow-700">Opening Hours:</span> {restaurantDetails.openingTime} - {restaurantDetails.closingTime}
        </p>
      </div>

      <div className="flex justify-center mt-1 py-1 gap-x-16" style={{ position: "relative", bottom: "110px" ,  transform: "translateX(-20px)" }}>  
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80"
          alt="Food 3"
          className="w-60 h-60 object-cover rounded-xl shadow-lg animate__animated animate__zoomIn animate__delay-2s"
          style={{ marginLeft: "70%" }}  
        />
      </div>
    </div>
  </div>
)}

 
<div className="max-w-8xl mx-auto px-14"
style={{
  position: "relative",
  bottom: "100px" ,
}}>

  
  {/* Flex container for Menu Section and Cart Section */}
  <div className="flex justify-between space-x-8"> {/* Added space-x-8 for horizontal spacing */}
    {/* Flex container for Categories and Menu Items */}
    <div className="flex flex-row space-x-8">
      
      {/* Category Section */}
      <div className="w-1/4   bg-white rounded-3xl shadow-lg border border-yellow-200 p-4" style={{ position: "relative", left: "7%" , height: "700px"  }}>
        <h3 className="text-2xl font-semibold text-yellow-600 mb-4">Categories</h3>
        <div className="flex flex-col space-y-4">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-full transition duration-300 ${
                activeCategory === category
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <div className="w-5/9" style={{ position: "relative", left: "9%" }}> 
          
        <div className="bg-white rounded-3xl shadow-lg border border-yellow-200">
          <div className="p-10 border-b border-yellow-200 bg-yellow-50 rounded-t-3xl">
             {/* Progress Steps */}
             <div className="flex justify-between mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <span className="mt-2 text-xs font-medium text-yellow-600">Cart</span>
                  </div>
                  <div className="w-full border-t-2 border-yellow-200 my-auto mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-yellow-500 font-bold">2</div>
                    <span className="mt-2 text-xs font-medium text-yellow-500">Details</span>
                  </div>
                  <div className="w-full border-t-2 border-yellow-200 my-auto mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-yellow-500 font-bold">3</div>
                    <span className="mt-2 text-xs font-medium text-yellow-500">Confirmation</span>
                  </div></div>
            <h2 className="text-4xl font-semibold text-yellow-600">Menu Items</h2>
            <p className="text-yellow-500 mt-3 text-lg">Select your favorite dishes and add them to your cart</p>
          </div>

          {/* Menu Items */}
          <div className="p-10 space-y-12" >
            {activeCategory === "All"
              ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {menuItems.map((item) => (
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
                          <span className="text-yellow-600 text-xl font-semibold">${item.menuItemPrice.toFixed(2)}</span>
                          <button
                            onClick={() =>
                              setCartItems([...cartItems, { ...item, instructions: "" }])
                            }
                            className="bg-yellow-500 text-white font-bold px-5 py-2 rounded-full hover:bg-yellow-600 transition text-lg md:text-xl transition duration-300 transform hover:scale-105 "
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
              : filteredItems.map((item) => (
                  <div
                    key={item.menuItemId}
                    className={`border border-gray-100 rounded-2xl bg-white overflow-hidden hover:shadow-xl transition duration-300 ${
                      activeCategory !== "All" ? "w-full h-auto" : ""
                    }`} // Further increase size for selected categories
                  >
                    <div
                      className={`${
                        activeCategory !== "All" ? "h-[28rem]" : "h-64"
                      } overflow-hidden bg-gray-100`} // Further adjust height for selected categories
                    >
                      <img
                        src={item.menuItemImage}
                        alt={item.menuItemName}
                        className={`w-full h-full object-cover ${
                          activeCategory !== "All" ? "hover:scale-115" : "hover:scale-105"
                        } transition-transform duration-300`} // Further adjust hover scale
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
                        <span className="text-yellow-600 text-xl font-semibold">${item.menuItemPrice.toFixed(2)}</span>
                        <button
                          onClick={() =>
                            setCartItems([...cartItems, { ...item, instructions: "" }])
                          }
                          className="bg-yellow-500 text-white font-bold px-5 py-2 rounded-full hover:bg-yellow-600 transition text-lg md:text-xl transition duration-300 transform hover:scale-105 "
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
    <div className="lg:w-1/3" style={{ position: "relative", left: "7%" }}> {/* Adjusted left position */}
      <div className="lg:w-2/3 p-6 bg-gradient-to-r from-yellow-300 to-yellow-400 text-white rounded-lg sticky top-4">
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
                className="w-full bg-white text-yellow-700 hover:bg-yellow-100 py-3 rounded-full text-base font-medium transition"
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
 

<div>
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

export default Cart;
