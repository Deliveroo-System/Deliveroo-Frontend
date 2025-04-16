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
      <h2 className="text-2xl font-bold text-gray-800">Approved Menus</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div
            key={menu.menuId}
            onClick={() => handleMenuClick(menu.menuId)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900">{menu.menuName}</h3>
            <p className="text-sm text-gray-600">{menu.menuDescription}</p>
          </div>
        ))}
      </div>

      {selectedMenuId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.menuItemId}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-3">
                  <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-orange-600 font-semibold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
