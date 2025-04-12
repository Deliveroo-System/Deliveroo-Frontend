import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RestaurantAdd = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "RestaurantOwner") {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "You must be logged in as a Restaurant Manager!",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login/user");
        }
      });
    }
  }, [navigate]);

  // 🔹 Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:8080/api/Restaurant/get-restaurants/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Categories:", data); // ✅ Log the categories here
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error); // ✅ Log error in console
        Swal.fire({
          icon: "error",
          title: "Failed to Load Categories",
          text: "Please try again later.",
        });
      });
  }, []);

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/Restaurant/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add restaurant");
        return response.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Restaurant Added!",
          text: "Your restaurant has been added successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/restaurant-manager"); // Redirect to the manager dashboard
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not add restaurant. Please try again.",
        });
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Your Restaurant</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
  name="categoryId"
  value={formData.categoryId}
  onChange={handleChange}
  className=""
  required
>
{categories.map((cat) => (
  <option key={cat.categoryId} value={cat.categoryId}>
    {cat.categoryName}
  </option>
))}

          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700">Opening Time</label>
  <input
    type="time"
    name="openingTime"
    value={formData.openingTime}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700">Closing Time</label>
  <input
    type="time"
    name="closingTime"
    value={formData.closingTime}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700">Is Approved</label>
  <select
    name="isApproved"
    value={formData.isApproved}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value={true}>Yes</option>
    <option value={false}>No</option>
  </select>
</div>

<div className="mb-4">
  <label className="block text-gray-700">Is Available</label>
  <select
    name="isAvailable"
    value={formData.isAvailable}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  >
    <option value={true}>Yes</option>
    <option value={false}>No</option>
  </select>
</div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantAdd;
