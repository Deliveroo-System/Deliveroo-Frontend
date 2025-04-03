import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import UserLogin from "./features/auth/userLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding";
import RestaurantAdd from "./pages/Restaurant/RestaurantAdd";
import Cart from "./pages/Order/Cart";
import Checkout from "./pages/Order/Checkout"; // Import Checkout
import Payment from "./pages/Order/Payment"; // Import Payment

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandinPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="auth/login/user" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurant/add" element={<RestaurantAdd />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order/checkout" element={<Checkout />} /> {/* Add Checkout route */}
      <Route path="/order/payment" element={<Payment />} /> {/* Add Payment route */}

      {/* Protected Routes */}
      {/* Admin Routes inside AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* 👈 Default child route */}
      </Route>
    </Routes>
  );
};

export default App;
