import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      if (response.role === "RestaurantOwner") {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid role");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080?restaurant')",
      }}
    >
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-gray-100 mb-6">
          Admin Login
        </h2>
        {error && (
          <p className="text-red-400 text-sm text-center font-medium">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition pr-12"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 accent-blue-500"
              />
              Remember Me
            </label>
            <button
              type="button"
              className="text-blue-400 text-sm hover:text-blue-300 transition"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 transition"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
