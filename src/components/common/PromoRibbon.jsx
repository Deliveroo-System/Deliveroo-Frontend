import React from "react";
import { FaUtensils } from "react-icons/fa";

// Array of appetizing food images for the ribbon background
const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

const PromoRibbon = () => {
  // Select a random image from the array
  const randomImage = foodImages[Math.floor(Math.random() * foodImages.length)];

  return (
    <div 
      className="w-full relative overflow-hidden"
      style={{ height: "180px" }} // Approximately 3 inches tall on most screens
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={randomImage}
          alt="Delicious food promotion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            {/* Left side - Main promo text */}
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="flex items-center">
                <FaUtensils className="text-3xl mr-3 text-yellow-400" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Up to <span className="text-yellow-400">25% off</span> meal deals this New Year
                </h2>
              </div>
              <p className="mt-2 text-lg md:text-xl max-w-2xl">
                Need a midweek pick-me-up, a break from cooking for the family or just fancy your favourite restaurant?
              </p>
            </div>
            
            {/* Right side - Terms */}
            <div className="text-sm bg-black bg-opacity-60 p-3 rounded-lg max-w-md">
              <p>
                Subject to availability. Participating restaurants only. Service/delivery fees apply. T&Cs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoRibbon;