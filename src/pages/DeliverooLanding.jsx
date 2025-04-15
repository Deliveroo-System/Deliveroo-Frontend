import React from "react";
import { FaMotorcycle, FaStore, FaBriefcase, FaSearch } from "react-icons/fa";
import CitiesNearMe from "../components/common/CitiesNearMe ";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import CookieConsent from "../components/common/Cookie";

// Then at the bottom of the return statement, before the closing </div>
<CookieConsent />
const DeliverooLanding = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("auth/login/restaurant-manager");
  };

  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-normal text-black">
          Deliveroo <span className="font-bold">FOOD</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 hover:text-black-600">
            Login
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-700">
            Sign Up
          </button>
        </div>
      </nav>

{/* Hero Section with Background Image */}
<div
  className="relative h-screen bg-cover bg-center flex items-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  <div className="relative z-10 text-white px-8 max-w-4xl mx-auto w-full text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      Order delivery near you
    </h1>
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-grow">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Enter delivery address"
          className="w-full py-4 pl-10 pr-4 rounded-lg text-gray-800 focus:outline-none"
        />
      </div>
      <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
        Find Food
      </button>
    </div>
  </div>
</div>
{/* Cards Section */}
<div className="max-w-8xl mx-auto px-4 py-20">  {/* Wider container, more padding */}
  <h2 className="text-4xl font-bold text-center mb-20">  {/* Larger heading */}
    More ways to use Deliveroo Food
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-14">  {/* Increased gap */}
    
    {/* Card 1 */}
    <div className="group">
      {/* Larger Image Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 mb-8">  {/* Increased height */}
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
          alt="Restaurant interior"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"  /* More zoom */
        />
        {/* Larger icon overlay */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center">
           {/* Larger icon */}
        </div>
      </div>
      
      {/* Text Content Below Image */}
      <div className="px-4">  {/* More padding */}
        <h3 className="text-3xl font-bold mb-4">  {/* Larger text */}
          Your restaurant, delivered
        </h3>
        <p className="text-gray-600 mb-6 text-lg">  {/* Larger text */}
          Add your restaurant on Deliveroo Food and reach new customers.
        </p>
        <button
      onClick={handleClick}
      className="text-black font-medium hover:underline flex items-center gap-3 text-lg"
    >
      Add your restaurant
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
      </div>
    </div>

    {/* Card 2 */}
    <div className="group">
      {/* Larger Image Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 mb-8">
        <img 
          src="https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
          alt="Delivery rider"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Larger icon overlay */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center">
        
        </div>
      </div>
      
      {/* Text Content Below Image */}
      <div className="px-4">
        <h3 className="text-3xl font-bold mb-4">
          Deliver with Deliveroo Food
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          Earn money by delivering food from restaurants.
        </p>
        <button className="text-black font-medium hover:underline flex items-center gap-3 text-lg">
          Sign up to deliver
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>

    {/* Card 3 */}
    <div className="group">
      {/* Larger Image Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-96 mb-8">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
          alt="Business meeting"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Larger icon overlay */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center">
        
        </div>
      </div>
      
      {/* Text Content Below Image */}
      <div className="px-4">
        <h3 className="text-3xl font-bold mb-4">
          Feed your employees
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          Deliveroo Food for Business helps you feed your team.
        </p>
        <button className="text-black font-medium hover:underline flex items-center gap-3 text-lg">
          Create a business account
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
<CitiesNearMe/>
<br></br>
 {/* Footer Section */}
<footer className="bg-gray-900 text-white pt-16 pb-8">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      
      {/* Column 1 - Logo & Social */}
      <div>
        <div className="flex items-center mb-6">
          <span className="text-2xl font-bold">Deliveroo</span>
        </div>
        <p className="text-gray-400 mb-6">
          Order your favorite food from local restaurants.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebook className="text-xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram className="text-xl" />
          </a>
        </div>
      </div>

      {/* Column 2 - Links */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Company</h3>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
        </ul>
      </div>

      {/* Column 3 - Links */}
      <div>
        <h3 className="text-lg font-semibold mb-6">For Restaurants</h3>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white transition">Partner With Us</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Business Account</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition">Restaurant Login</a></li>
        </ul>
      </div>

      {/* Column 4 - App Download */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Get the App</h3>
        <div className="space-y-4">
          <a href="#" className="block">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" 
              alt="App Store" 
              className="h-12 w-auto"
            />
          </a>
          <a href="#" className="block">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" 
              alt="Google Play" 
              className="h-12 w-auto"
            />
          </a>
        </div>
      </div>
      
    </div>
    
  
    {/* Bottom Section */}
    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-gray-400 text-sm mb-4 md:mb-0">
        © {new Date().getFullYear()} Deliveroo. All rights reserved.
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
        <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies</a>
      </div>
    </div>
  </div>
</footer>
<CookieConsent />
    </div>
  );
};

export default DeliverooLanding;
