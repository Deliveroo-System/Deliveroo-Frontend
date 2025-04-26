import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import NavBar from "../../components/common/headerlanding";
import Footer from "../../components/common/footerLanding";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in to view restaurants.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/Restaurant/get-all-restaurants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError("Unauthorized: Invalid or expired token. Please log in again.");
          return;
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError("Error fetching restaurants. Please try again later.");
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, []);

  if (error) {
    return (
      <>
        <NavBar />
        <div className="bg-gray-100 p-6">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8">{error}</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="max-w-8xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-20">
          Explore Restaurants on Deliveroo Food
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {restaurants
            .filter((restaurant) => restaurant.isApproved)
            .map((restaurant) => (
              <div key={restaurant.restaurantId} className="group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 mb-8">
                  <img
                    src={restaurant.imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1470&q=80"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-opacity-70 bg-black text-white w-24 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    {restaurant.isAvailable ? "Available" : "Unavailable"}
                  </div>
                </div>

                {/* Restaurant Info and Button Section */}
                <div className="flex items-center justify-between px-4 mb-8">
                  <div className="flex flex-col w-3/4">
                    <h3 className="text-3xl font-bold mb-4">{restaurant.name}</h3>
                    <p className="text-gray-600 mb-4 text-lg italic">
                      {restaurant.description}
                    </p>
                    <div className="text-gray-600 text-sm mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      {restaurant.address}
                    </div>
                    <div className="text-gray-600 text-sm mb-2 flex items-center">
                      <FaPhoneAlt className="mr-2 text-green-500" />
                      {restaurant.phoneNumber}
                    </div>
                    <div className="text-gray-600 text-sm mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-pink-500" />
                      {restaurant.email || "N/A"}
                    </div>
                    <div className="text-gray-600 text-sm flex items-center">
                      <FaClock className="mr-2 text-purple-500" />
                      {restaurant.openingTime} - {restaurant.closingTime}
                    </div>
                  </div>
                  {/* Button for "Available Menu Items" */}
                  <div className="w-1/4 flex items-center justify-center">
                    <button
                      onClick={() =>
                        navigate(`/cart`, { state: { restaurantId: restaurant.restaurantId } })
                      }
                      className="mt-12 px-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full text-lg md:text-xl transition duration-300 transform hover:scale-105 "
                      style={{ backgroundColor: "rgba(255,88,35,255)" }}
                    >
                       Menu Items
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
