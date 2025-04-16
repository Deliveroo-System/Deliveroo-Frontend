import React from "react";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center px-9 py-6 text-white sticky top-0 z-50 mx-4 my-2 rounded-xl shadow-lg backdrop-blur-md"
      style={{ backgroundColor: "rgba(20, 20, 20, 0.9)" }} // 70% opacity
    >
      <div className="text-2xl font-normal tracking-tight">
        Deliveroo <span className="font-bold " style={{ color: "rgba(255,88,35,255)" }}>FOOD</span>
      </div>

      <div className="flex space-x-4">
        <button className="px-5 py-2 text-gray-100 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600" >
          Login
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"style={{ backgroundColor: "rgba(255,88,35,255)" }}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
