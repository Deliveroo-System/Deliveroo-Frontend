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

<<<<<<< Updated upstream
      <div className="flex space-x-4">
        <button className="px-5 py-2 text-gray-100 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600" >
          Login
        </button>
        <button className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"style={{ backgroundColor: "rgba(255,88,35,255)" }}>
          Sign Up
        </button>
      </div>
    </nav>
=======
        <div className="flex space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/order/login")}
                className="px-5 py-2 text-gray-100 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/order/signup")}
                className="px-6 py-2 text-white font-medium rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                style={{ backgroundColor: "rgba(255,88,35,1)" }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/User/Profile")}
                className="px-6 py-2 text-white font-medium rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-white font-medium rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      
      {/* Add global styles for the blur effect */}
      <style jsx global>{`
        .blur-active {
          overflow: hidden;
        }
        .blur-active > *:not(.swal2-container):not(nav) {
          filter: blur(5px) brightness(0.7);
          transition: filter 0.3s ease;
          pointer-events: none;
        }
        .sweet-alert-popup {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 16px !important;
        }
        .sweet-alert-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px !important;
        }
        .sweet-alert-html {
          font-family: 'Inter', sans-serif !important;
          font-weight: 400 !important;
        }
        .sweet-alert-confirm-btn {
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
          transition: all 0.2s ease !important;
        }
        .sweet-alert-confirm-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 8px rgba(255, 88, 35, 0.3) !important;
        }
        .sweet-alert-cancel-btn {
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
          transition: all 0.2s ease !important;
        }
        .sweet-alert-cancel-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 8px rgba(100, 100, 100, 0.3) !important;
        }
      `}</style>
    </>
>>>>>>> Stashed changes
  );
};

export default Navbar;
