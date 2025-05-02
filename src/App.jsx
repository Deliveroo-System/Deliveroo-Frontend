<<<<<<< Updated upstream
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import UserLogin from "./features/auth/RestarurantManagerLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding";
import Log from "./pages/Order/adminLog";
import Cart from "./pages/Order/Cart";
import Checkout from "./pages/Order/Checkout"; // Import Checkout
import Profile from "./pages/Order/Profile"; 
import LoginOrder from "./pages/Order/Login";
import Restaurant from "./pages/Order/Restaurant";
import Dash from "./pages/Order/orderDashboard";
import RestaurantAdd from "./features/auth/RestaurantAdd";
import RestaurantManagerRegister from "./features/auth/RegistrationFlow";
import RestaurantHome from "./pages/Restaurant/HomeRestaurants";

// Restaurant pages
import RestaurantDashboard from "./pages/Restaurant/Dashboard";
import Orders from "./pages/Restaurant/Orders";
import Menus from "./pages/Restaurant/Menus";
import Payments from "./pages/Restaurant/Payments";
import Help from "./pages/Restaurant/Help";
 
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
      <Route path="/order/profile" element={<Profile />} /> {/* Add Profile route */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/order/checkout" element={<Checkout />} /> {/* Add Checkout route */}
      <Route path="/order/admin/login" element={<Log />} /> {/* Add Admin Login route */}
      <Route path="/order/login" element={<LoginOrder />} /> {/* Add Order Login route */}
      <Route path="/order/restaurant" element={<Restaurant />} /> {/* Add Restaurant route */}
      <Route path="/order/dashboard" element={<Dash />} /> {/* Add Order Dashboard route */}
      {/* Restaurant Routes */}

      {/* Admin Routes */} 
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/headerlanding';
import './App.css';

import Login from "./features/auth/Login";
import UserLogin from "./features/auth/RestarurantManagerLogin";
import Register from "./features/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import LandinPage from "./pages/DeliverooLanding";
import Cart from "./pages/Order/Cart";
import Checkout from "./pages/Order/Checkout";
import Profile from "./pages/Order/Profile";
import LoginOrder from "./pages/Order/Login";
import Restaurant from "./pages/Order/Restaurant";
import RestaurantAdd from "./features/auth/RestaurantAdd";
import RestaurantManagerRegister from "./features/auth/RegistrationFlow";
import CheckoutPage from "./pages/payment/CheckoutPage";
import RestaurantHome from "./pages/Restaurant/HomeRestaurants";
import RestaurantDashboard from "./pages/Restaurant/Dashboard";
import Orders from "./pages/Restaurant/Orders";
import Menus from "./pages/Restaurant/Menus";
import Payments from "./pages/Restaurant/Payments";
import Help from "./pages/Restaurant/Help";
import OrderSuccess from "./pages/Order/OrderSuccess";
import AdminRestaurantManagement from "./pages/admin/AdminRestaurantManagement";
import AdminUserManagement from "./pages/admin/OrderDashboard";

// Delivery pages
import Delivery from "./pages/Delivery/Delivery";
import DriverLogin from "./pages/Delivery/DriverLogin";
import OrderConfirm from "./pages/Delivery/orderConfirm";
import DriverAuth from './components/DriverAuth';
import DriverDashboard from './pages/Delivery/DriverDashboard';
import DriverTracking from './pages/Delivery/DriverTracking';

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
     
      <main className="main-content">
        <Routes>

          {/* Redirect root to landing page */}
          <Route path="/" element={<LandinPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/login/restaurant-manager" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant/add" element={<RestaurantAdd />} />
          <Route path="/restaurant/restaurant-manager/register" element={<RestaurantManagerRegister />} />

          {/* Driver authentication */}
          <Route path="/driverLogin" element={<DriverAuth isLogin={true} />} />
          <Route path="/driverRegister" element={<DriverAuth isLogin={false} />} />

          {/* Protected driver dashboard */}
          <Route path="/driverDashboard" element={
            <PrivateRoute>
              <DriverDashboard />
            </PrivateRoute>
          } />

          {/* Driver tracking - public */}
          <Route path="/track-delivery" element={<DriverTracking />} />

          {/* Order Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/checkout" element={<Checkout />} />
          <Route path="/User/Profile" element={<Profile />} />
          <Route path="/order/login" element={<LoginOrder />} />
          <Route path="/order/restaurant" element={<Restaurant />} />
          <Route path="/order/success" element={<OrderSuccess />} />

          {/* Payment */}
          <Route path="/payment/user/checkout" element={<CheckoutPage />} />

          {/* Delivery Routes */}
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/delivery/login" element={<DriverLogin />} />
          <Route path="/delivery/order-confirm" element={<OrderConfirm />} />

          {/* Restaurant Manager Dashboard Routes */}
          <Route path="/restaurant/dashboard" element={<RestaurantHome />}>
            <Route index element={<RestaurantDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menus" element={<Menus />} />
            <Route path="payments" element={<Payments />} />
            <Route path="help" element={<Help />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="restaurants" element={<AdminRestaurantManagement />} />
            <Route path="users" element={<AdminUserManagement />} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
>>>>>>> Stashed changes
