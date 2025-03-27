// src/features/auth/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    id: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="phoneNumber" type="text" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        </form>
        <p className="text-sm text-center mt-3">
          Already have an account? <button onClick={() => navigate("/login")} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;