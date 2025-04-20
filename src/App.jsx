import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import UserLogin from "./features/auth/RestarurantManagerLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding"
import RestaurantAdd from "./features/auth/RestaurantAdd"
import RestaurantManagerRegister from "./features/auth/RegistrationFlow";
import PaymentPage from './pages/payment/PaymentPage';
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandinPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="auth/login/restaurant-manager" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurant/add" element={<RestaurantAdd />} />
      <Route path="/restaurant/restaurant-manager/register" element={<RestaurantManagerRegister />} />
      <Route path="/payment" element={<PaymentPage />} />
      {/* Admin Routes inside AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* 👈 Default child route */}
      </Route>
    </Routes>
  );
};

export default App;
