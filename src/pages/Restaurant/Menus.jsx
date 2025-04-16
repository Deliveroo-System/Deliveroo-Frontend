import { useEffect, useState } from "react";
import axios from "axios";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/Restaurant/get-restaurant-menu/${restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const approvedMenus = response.data.filter(menu => menu.isApproved);
        setMenus(approvedMenus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [restaurantId, token]);

  const handleMenuClick = async (menuId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/restaurant/menu/MenuItems/${restaurantId}/menus/${menuId}/items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMenuItems(response.data);
      setSelectedMenuId(menuId);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">📋 Approved Menus</h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div
            key={menu.menuId}
            onClick={() => handleMenuClick(menu.menuId)}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-orange-400"
          >
            <h3 className="text-xl font-bold text-gray-800">{menu.menuName}</h3>
            <p className="text-sm text-gray-600 mt-2">{menu.menuDescription}</p>
          </div>
        ))}
      </div>
  
      {selectedMenuId && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">🍽 Menu Items</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.menuItemId}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-base text-orange-600 font-bold">
                    ${item.price.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
}
