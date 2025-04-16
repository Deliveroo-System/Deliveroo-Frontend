import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/Restaurant/get-restaurant-menu/${restaurantId}`,
        { headers }
      );
      const approvedMenus = response.data.filter((menu) => menu.isApproved);
      setMenus(approvedMenus);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);
  const handleCreateItem = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Add Menu Item",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input id="item-name" class="swal2-input" placeholder="Name" />
          <textarea id="item-desc" class="swal2-textarea" placeholder="Description"></textarea>
          <input id="item-price" type="number" class="swal2-input" placeholder="Price" />
          
          <div style="display: flex; gap: 10px; align-items: center;">
            <input id="item-image" class="swal2-input" placeholder="Image filename (ex: veggie_pizza.jpg)" />
            <button id="image-picker" style="padding: 8px 8px; background-color: #FF5823; border: none; color: white; border-radius: 5px; cursor: pointer;  width: 300px; margin-top:31px ">
              📁 Browse
            </button>
          </div>
  
          <label style="font-size: 14px; display: flex; align-items: center; gap: 5px;">
            <input type="checkbox" id="item-available" checked /> Available
          </label>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: "Add",
      didOpen: () => {
        const pickerButton = document.getElementById("image-picker");
        const imageInput = document.getElementById("item-image");
  
        pickerButton.addEventListener("click", () => {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
  
          fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
              imageInput.value = file.name;
              // You can also implement a file upload or copy logic to /assets if needed
            }
          };
  
          fileInput.click();
        });
      },
      preConfirm: () => {
        return {
          name: document.getElementById("item-name").value,
          description: document.getElementById("item-desc").value,
          price: parseFloat(document.getElementById("item-price").value),
          imageUrl: document.getElementById("item-image").value, // we only store the filename like "veggie_pizza.jpg"
          isAvailable: document.getElementById("item-available").checked,
        };
      },
    });
  
    if (formValues) {
      try {
        await axios.post(
          `http://localhost:8080/api/restaurant/menu/MenuItems/${restaurantId}/menus/${selectedMenuId}/items`,
          formValues,
          { headers }
        );
        Swal.fire("Success", "Menu item added!", "success");
        handleMenuClick(selectedMenuId);
      } catch (err) {
        Swal.fire("Error", "Failed to add item.", "error");
      }
    }
  };
  

  const handleUpdateItem = async (item) => {
    const { value: formValues } = await MySwal.fire({
      title: "Edit Menu Item",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input id="item-name" class="swal2-input" value="${item.name}" placeholder="Item Name" />
          <textarea id="item-desc" class="swal2-textarea" placeholder="Description">${item.description}</textarea>
          <input id="item-price" type="number" class="swal2-input" value="${item.price}" placeholder="Price" />
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <input id="item-image" class="swal2-input" value="${item.imageUrl}" placeholder="Image filename (e.g. veggie.jpg)" />
            <button id="image-picker" style="padding: 8px 8px; background-color: #FF5823; border: none; color: white; border-radius: 5px; cursor: pointer;  width: 380px; margin-top:30px ">
              📁 Browse
            </button>
          </div>
  
          <label style="font-size:14px; display: flex; align-items: center; gap: 5px;">
            <input type="checkbox" id="item-available" ${item.isAvailable ? "checked" : ""} /> Available
          </label>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: "Update",
      didOpen: () => {
        const pickerButton = document.getElementById("image-picker");
        const imageInput = document.getElementById("item-image");
  
        pickerButton.addEventListener("click", () => {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
  
          fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
              imageInput.value = file.name;
            }
          };
  
          fileInput.click();
        });
      },
      preConfirm: () => {
        return {
          name: document.getElementById("item-name").value,
          description: document.getElementById("item-desc").value,
          price: parseFloat(document.getElementById("item-price").value),
          imageUrl: document.getElementById("item-image").value,
          isAvailable: document.getElementById("item-available").checked,
        };
      },
    });
  
    if (formValues) {
      try {
        await axios.put(
          `http://localhost:8080/api/restaurant/menu/menuitems/${restaurantId}/menus/${selectedMenuId}/items/${item.menuItemId}`,
          formValues,
          { headers }
        );
        Swal.fire("Success", "Menu item updated!", "success");
        handleMenuClick(selectedMenuId);
      } catch (err) {
        Swal.fire("Error", "Failed to update item.", "error");
      }
    }
  };
  

  const handleDeleteItem = async (item) => {
    const confirm = await Swal.fire({
      title: "Delete this item?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8080/api/restaurant/menu/menuitems/${restaurantId}/menus/${selectedMenuId}/items/${item.menuItemId}`,
          { headers }
        );
        Swal.fire("Deleted!", "Item removed successfully.", "success");
        handleMenuClick(selectedMenuId);
      } catch (err) {
        Swal.fire("Error", "Failed to delete item.", "error");
      }
    }
  };

  const handleMenuClick = async (menuId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/restaurant/menu/MenuItems/${restaurantId}/menus/${menuId}/items`,
        { headers }
      );
      setMenuItems(response.data);
      if (response.data.length === 0) {
        setMenuItems([]);
      }

      setSelectedMenuId(menuId);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleCreate = async () => {
    const { value: result } = await MySwal.fire({
      title: "Add New Menu",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input id="menu-name" class="swal2-input" placeholder="Menu Name" />
          <textarea id="menu-desc" class="swal2-textarea" placeholder="Description"></textarea>
          <label style="font-size:14px">
            <input type="checkbox" id="menu-active" checked /> Is Active
          </label>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: "Create",
      preConfirm: () => {
        const menuName = document.getElementById("menu-name").value;
        const description = document.getElementById("menu-desc").value;
        const isActive = document.getElementById("menu-active").checked;
        return { menuName, description, isActive };
      },
    });

    if (result) {
      try {
        await axios.post(
          `http://localhost:8080/api/restaurant/menus/${restaurantId}/menus`,
          result,
          { headers }
        );
        Swal.fire("Created!", "Menu successfully added.", "success");
        fetchMenus();
      } catch (err) {
        Swal.fire("Error!", "Failed to create menu.", "error");
      }
    }
  };

  const handleUpdate = async (menu) => {
    const { value: result } = await MySwal.fire({
      title: "Edit Menu",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input id="menu-name" class="swal2-input" placeholder="Menu Name" value="${
            menu.menuName
          }" />
          <textarea id="menu-desc" class="swal2-textarea" placeholder="Description">${
            menu.menuDescription
          }</textarea>
          <label style="font-size:14px">
            <input type="checkbox" id="menu-active" ${
              menu.isAvailable ? "checked" : ""
            } /> Is Active
          </label>
        </div>
      `,

      focusConfirm: false,
      confirmButtonText: "Update",
      preConfirm: () => {
        const menuName = document.getElementById("menu-name").value;
        const description = document.getElementById("menu-desc").value;
        const isActive = document.getElementById("menu-active").checked;

        return { menuName, description, isActive }; // still send isActive as expected
      },
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:8080/api/restaurant/menus/${restaurantId}/menus/${menu.menuId}`,
          result,
          { headers }
        );
        Swal.fire("Updated!", "Menu has been updated.", "success");
        fetchMenus();
      } catch (err) {
        Swal.fire("Error!", "Failed to update menu.", "error");
      }
    }
  };

  const handleDelete = async (menuId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the menu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8080/api/restaurant/menus/${restaurantId}/menus/${menuId}`,
          { headers }
        );
        Swal.fire("Deleted!", "Menu has been removed.", "success");
        fetchMenus();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete menu.", "error");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">📋 Approved Menus</h2>
        <button
          onClick={handleCreate}
          className="bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition text-sm font-medium shadow"
          style={{
            background: "rgba(255,88,35,255)",
            fontWeight: "bold", // Makes text bold
            letterSpacing: "0.5px", // Adds a little space between letters
          }}
        >
          Create Menu
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div
            key={menu.menuId}
            className="relative bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-200 border border-gray-200"
          >
            <div
              onClick={() => handleMenuClick(menu.menuId)}
              className="cursor-pointer"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {menu.menuName}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {menu.menuDescription}
              </p>
              <div className="mt-2">
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                    menu.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {menu.isAvailable ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="absolute top-3 right-3 flex gap-3">
              <button
                onClick={() => handleUpdate(menu)}
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(menu.menuId)}
                className="text-sm text-red-600 font-semibold hover:underline"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMenuId && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              🍽 Menu Items
            </h2>
            <button
              onClick={handleCreateItem}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm shadow"
              style={{
                background: "rgba(255,88,35,255)",
                fontWeight: "bold", // Makes text bold
                letterSpacing: "0.px", // Adds a little space between letters
              }}
            >
              Add Item
            </button>
          </div>

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
                  <h4 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdateItem(item)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="text-sm text-red-600 hover:underline font-medium"
                  >
                    🗑 Delete
                  </button>
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
