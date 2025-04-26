import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import UserLogin from "./features/auth/RestarurantManagerLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding";
 
import Cart from "./pages/Order/Cart";
import Checkout from "./pages/Order/Checkout"; // Import Checkout
import Payment from "./pages/Order/Payment"; // Import Payment
import LoginOrder from "./pages/Order/Login";
import Restaurant from "./pages/Order/Restaurant";
 
import RestaurantAdd from "./features/auth/RestaurantAdd";
import RestaurantManagerRegister from "./features/auth/RegistrationFlow";
import RestaurantHome from "./pages/Restaurant/HomeRestaurants";

// Restaurant pages
import RestaurantDashboard from "./pages/Restaurant/Dashboard";
import Orders from "./pages/Restaurant/Orders";
import Menus from "./pages/Restaurant/Menus";
import Payments from "./pages/Restaurant/Payments";
import Help from "./pages/Restaurant/Help";

import AdminRestaurantManagement from "./pages/admin/AdminRestaurantManagement"

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandinPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/login/restaurant-manager" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurant/add" element={<RestaurantAdd />} /> 
        {/* Protected Routes */}
      {/* Admin Routes inside AdminLayout */} 
      <Route path="/restaurant/restaurant-manager/register" element={<RestaurantManagerRegister />} />

      {/* Restaurant Manager Routes */}
      <Route path="/restaurant/dashboard" element={<RestaurantHome />}>
        <Route index element={<RestaurantDashboard />} /> {/* Default route */}
        <Route path="orders" element={<Orders />} />
        <Route path="menus" element={<Menus />} />
        <Route path="payments" element={<Payments />} />
        <Route path="help" element={<Help />} />
      </Route>


      {/* Order Routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/order/checkout" element={<Checkout />} /> {/* Add Checkout route */}
      <Route path="/order/payment" element={<Payment />} /> {/* Add Payment route */}
      <Route path="/order/login" element={<LoginOrder />} /> {/* Add Order Login route */}
      <Route path="/order/restaurant" element={<Restaurant />} /> {/* Add Restaurant route */}

      {/* Restaurant Routes */}

      {/* Admin Routes */} 
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="restaurants" element={<AdminRestaurantManagement />} />
      </Route>
    </Routes>
  );
};

export default App;
