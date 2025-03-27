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
      if (response.role === "Admin") {
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
        backgroundImage: "url('/src/assets/img/background-1591228.jpg')",
        filter: "blur(0px)" // This will be handled by the overlay
      }}
    >
      {/* Background overlay with color and blur */}
      <div 
        className="absolute inset-0 bg-[#3E3F5B] opacity-90 backdrop-blur-md"
        style={{
          background: "linear-gradient(to bottom right, rgba(62, 63, 91, 0.9), rgba(138, 178, 166, 0.2))",
        }}
      ></div>
      
      {/* Login form container */}
      <div className="relative bg-[#F6F1DE] rounded-2xl p-8 w-full max-w-md shadow-xl z-40 transition-all hover:shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
  <div className=" bg-white/10 rounded-xl shadow-md backdrop-blur-sm">
    <img
      src="src/assets/img/food ordering and delivery platform (2).png"
      alt="Logo"
      className="w-28 h-28 object-contain rounded-lg"
    />
  </div>
</div>

        <h2 className="text-3xl font-bold text-center text-[#3E3F5B] mb-6 tracking-tight">
          Admin Login
        </h2>
        {error && (
          <p className="text-[#3E3F5B] text-sm text-center font-medium animate-pulse">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#3E3F5B]/80 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#3E3F5B] outline-none transition placeholder:text-[#3E3F5B]/60 focus:ring-2 focus:ring-[#8AB2A6]/50"
                placeholder="Enter your email"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-[#3E3F5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-[#3E3F5B]/80 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#3E3F5B] outline-none transition placeholder:text-[#3E3F5B]/60 focus:ring-2 focus:ring-[#8AB2A6]/50 pr-12"
                placeholder="Enter your password"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  className="text-[#3E3F5B]/50 hover:text-[#3E3F5B] transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#3E3F5B]/70">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 rounded bg-white border-[#8AB2A6] text-[#8AB2A6] focus:ring-[#8AB2A6]"
              />
              Remember Me
            </label>
            <button
              type="button"
              className="text-[#8AB2A6] text-sm hover:text-[#ACD3A8] transition"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          
<button
  type="submit"
  style={{
    backgroundColor: '#27548A',
    color: 'white',
  }}
  className="w-full py-3 rounded-lg font-medium hover:bg-[#ACD3A8] transition-all shadow-md hover:shadow-[#8AB2A6]/30 mt-4 focus:ring-2 focus:ring-[#8AB2A6]/50 focus:outline-none"
>
  Login
</button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-[#3E3F5B]/60">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-[#8AB2A6] hover:text-[#ACD3A8] transition font-medium"
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