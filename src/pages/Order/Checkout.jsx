import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService, userDetailsService } from "../../services/apiOrder"; // Add userDetailsService import
import { jwtDecode } from "jwt-decode"; 
 import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding"; 
import chechImg from "../../assets/img/back.png";
import back from "../../assets/img/check.png"; 

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "Cash"
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [selectedCardType, setSelectedCardType] = useState('visa');
  const cartItems = location.state?.cartItems || [];

  const getCardType = (number) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6/
    };

    for (const [type, regex] of Object.entries(re)) {
      if (regex.test(number)) return type;
    }
    return 'generic';
  };

  const cardStyles = {
    visa: {
      background: 'linear-gradient(135deg, #0061FF 0%, #60EFFF 100%)',
      shadow: 'rgba(0, 97, 255, 0.3)'
    },
    mastercard: {
      background: 'linear-gradient(135deg, #FF8D2F 0%, #FF0080 100%)',
      shadow: 'rgba(255, 141, 47, 0.3)'
    },
    amex: {
      background: 'linear-gradient(135deg, #00D6AF 0%, #00F2FF 100%)',
      shadow: 'rgba(0, 214, 175, 0.3)'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Log the entire decoded token for debugging

        // Extract email based on the claims structure
        const emailClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        if (decoded[emailClaim]) {
          setUserEmail(decoded[emailClaim]);
          setUserName(decoded[emailClaim].split("@")[0]);
        } else {
          console.warn("Token does not contain an email property.");
          alert("Invalid token. Please log in again.");
          navigate("/order/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
        alert("Failed to decode token. Please log in again.");
        navigate("/order/login");
      }
    } else {
      console.warn("No token found in localStorage.");
      alert("You are not logged in. Please log in to continue.");
      navigate("/order/login");
    }
  }, []);

  useEffect(() => {
    console.log("Cart items in checkout page:", cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    try {
      // Validate card details if card payment is selected
      if (customerDetails.paymentMethod === "Card") {
        if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
          alert("Please fill in all card details");
          return;
        }
      }

      // Prepare UserDetails payload
      const userDetailsPayload = {
        customerName: customerDetails.name,
        phoneNumber: customerDetails.phone,
        address: customerDetails.address,
        city: customerDetails.city,
        zipCode: customerDetails.zipCode,
        paymentMethod: customerDetails.paymentMethod,
        cardDetails: customerDetails.paymentMethod === "Card" ? cardDetails : undefined,
        items: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity || 1,
          price: item.price,
        })),
        totalAmount: totalPrice + 2.99 + totalPrice * 0.1,
      };

      console.log("UserDetails Payload:", userDetailsPayload);

      // Save customer details
      const savedUserDetails = await userDetailsService.createUserDetails(userDetailsPayload);
      console.log("Saved User Details:", savedUserDetails);

      // Prepare Order payload
      const orderPayload = {
        customerName: customerDetails.name || userName,
        customerEmail: userEmail,
        foodItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        totalPrice: totalPrice + 2.99 + totalPrice * 0.1, // Including delivery fee and tax
      };

      console.log("Order Payload:", orderPayload);

      // Save order details
      const savedOrder = await orderService.createOrder(orderPayload);
      console.log("Saved Order:", savedOrder);

      // Notify user of success
      alert("Order placed successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('card')) {
      setCardDetails({
        ...cardDetails,
        [name.replace('card', '').toLowerCase()]: value
      });
    } else {
      setCustomerDetails({
        ...customerDetails,
        [name]: value
      });
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Order Summary */}
            <div className="lg:w-2/3 p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Complete Your Order
                  </h2>
                  <p className="mt-2 text-gray-600">Please review your order and fill in your details</p>
                </div>

                 

                {/* Delivery Details Form */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    Delivery Details
                  </h3>
                  
                  <div className="grid gap-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Full Name"
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea
                        name="address"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your delivery address"
                        required
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={customerDetails.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={customerDetails.zipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter ZIP code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="bg-purple-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </span>
                    Payment Method
                  </h3>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        checked={customerDetails.paymentMethod === "Cash"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cash on Delivery
                      </span>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Card"
                        checked={customerDetails.paymentMethod === "Card"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Card Payment
                      </span>
                    </label>
                  </div>

                  {/* Card Details Section */}
                  {customerDetails.paymentMethod === "Card" && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {['visa', 'mastercard', 'amex'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedCardType(type)}
                            className={`relative p-4 border-2 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                              selectedCardType === type 
                                ? 'border-blue-500 shadow-lg' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{
                              background: selectedCardType === type ? cardStyles[type].background : 'white',
                              boxShadow: selectedCardType === type 
                                ? `0 8px 16px ${cardStyles[type].shadow}` 
                                : 'none'
                            }}
                          >
                            <div className={`transition-opacity duration-300 ${
                              selectedCardType === type ? 'opacity-100' : 'opacity-70'
                            }`}>
                              <img
                                src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${type}.png`}
                                alt={type}
                                className="h-12 w-auto mx-auto filter drop-shadow-md"
                              />
                            </div>
                            {selectedCardType === type && (
                              <div className="absolute top-2 right-2 animate-fadeIn">
                                <svg 
                                  className="w-6 h-6 text-white" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Updated Card Preview */}
                      <div className="relative h-56 w-full rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                        <div className="relative p-6 text-white h-full flex flex-col justify-between">
                          <div className="absolute top-4 right-4">
                            <img
                              src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${selectedCardType}.png`}
                              alt="Card type"
                              className="h-8"
                            />
                          </div>
                          <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-md"></div>
                              {cardDetails.cardNumber && (
                                <img
                                  src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType(cardDetails.cardNumber)}.png`}
                                  alt="Card type"
                                  className="h-8"
                                />
                              )}
                            </div>
                            <div className="text-xl tracking-widest mb-4 font-mono">
                              {cardDetails.cardNumber
                                ? cardDetails.cardNumber.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••'
                                : '•••• •••• •••• ••••'}
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-xs opacity-60 mb-1">Card Holder</div>
                                <div className="font-medium tracking-wider">
                                  {customerDetails.name || 'FULL NAME'}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs opacity-60 mb-1">Expires</div>
                                <div className="font-medium tracking-wider">
                                  {cardDetails.expiryDate || 'MM/YY'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                            maxLength="16"
                            pattern="\d*"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="cardExpiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              name="cardCvv"
                              value={cardDetails.cvv}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123"
                              maxLength="3"
                              pattern="\d*"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary Sticky */}
            <div className="lg:w-1/3 bg-gray-50 p-8">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Order Summary
                  </h3>

                  {/* Items List */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      {/* Customer Email */}
                      <div className="flex items-center space-x-2 mb-4 text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{userEmail}</span>
                      </div>

                      {/* Simple Item List */}
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span className="text-gray-800">{item.name}</span>
                          <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rest of the price breakdown */}
                    <div className="mt-6 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>${(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">
                          ${(totalPrice + 2.99 + (totalPrice * 0.1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium text-gray-700">Delivery Details</h4>
                    {customerDetails.name && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {customerDetails.name}
                      </div>
                    )}
                    {customerDetails.address && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {customerDetails.address}
                      </div>
                    )}
                    {customerDetails.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {customerDetails.phone}
                      </div>
                    )}
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Place Order</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                {/* Security Image */}
                <div className="mt-6">
                  <img 
                    src={chechImg} 
                    alt="Security Check" 
                    className="w-full h-186 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Updated Footer */}
        <br></br> 
             <Footer /> 
    </div>
  );
}

export default Checkout;
