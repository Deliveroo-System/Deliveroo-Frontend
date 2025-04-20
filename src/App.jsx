import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import UserLogin from "./features/auth/RestarurantManagerLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding";
import RestaurantAdd from "./features/auth/RestaurantAdd";
import RestaurantManagerRegister from "./features/auth/RegistrationFlow";
import RestaurantHome from "./pages/Restaurant/HomeRestaurants";

// Restaurant pages
import RestaurantDashboard from "./pages/Restaurant/Dashboard";
import Orders from "./pages/Restaurant/Orders";
import Menus from "./pages/Restaurant/Menus";
import Payments from "./pages/Restaurant/Payments";
import Help from "./pages/Restaurant/Help";

// Delivery pages
import Delivery from "./pages/Delivery/Delivery";

// ✅ New imports
import RealTimeListener from "./components/RealTimeListener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* ✅ Toast system */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ WebSocket real-time listener */}
      <RealTimeListener />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandinPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/login/restaurant-manager" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant/add" element={<RestaurantAdd />} />
        <Route path="/restaurant/restaurant-manager/register" element={<RestaurantManagerRegister />} />

        {/* Restaurant Manager Routes */}
        <Route path="/restaurant/dashboard" element={<RestaurantHome />}>
          <Route index element={<RestaurantDashboard />} /> {/* Default route */}
          <Route path="orders" element={<Orders />} />
          <Route path="menus" element={<Menus />} />
          <Route path="payments" element={<Payments />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* Delivery Routes */}
        <Route path="/delivery" element={<Delivery />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
