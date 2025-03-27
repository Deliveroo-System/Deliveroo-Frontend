import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { 
  HomeIcon, 
  Cog6ToothIcon, 
  BuildingStorefrontIcon,
  Squares2X2Icon,
  RectangleGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-lg h-screen flex flex-col fixed transition-all duration-300 ease-in-out z-10 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-5 border-b border-cyan-600 flex items-center justify-between">
          {sidebarOpen ? (
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Cog6ToothIcon className="h-6 w-6" />
              <span>Restaurant Admin</span>
            </h2>
          ) : (
            <div className="flex justify-center w-full">
              <Cog6ToothIcon className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-indigo-700 hover:bg-indigo-600 text-white p-1 rounded-full border-2 border-cyan-600 shadow-md"
        >
          {sidebarOpen ? (
            <ChevronLeftIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </button>

        <nav className="p-4 space-y-1 flex-grow">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/admin/restaurants"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <BuildingStorefrontIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Restaurants</span>}
          </NavLink>

          <NavLink
            to="/admin/menus"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <Squares2X2Icon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Menus</span>}
          </NavLink>

          <NavLink
            to="/admin/menu-items"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <RectangleGroupIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Menu Items</span>}
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <UsersIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Users</span>}
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
              }`
            }
          >
            <ChartBarIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Reports</span>}
          </NavLink>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4">
          <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-cyan-100 hover:bg-cyan-700 hover:text-white transition-all">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 overflow-auto p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;