import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/headerlanding'; // Adjust the path if necessary
import './App.css';

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

//Delivery pages
import Delivery from "./pages/Delivery/Delivery";
import DriverLogin from "./pages/Delivery/DriverLogin";
import OrderConfirm from "./pages/Delivery/orderConfirm";
import DriverAuth from './components/DriverAuth';
import DriverDashboard from './pages/Delivery/DriverDashboard';
import DriverTracking from './pages/Delivery/DriverTracking'; // Add this import

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('driverToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth routes */}
          <Route path="/driverLogin" element={<DriverAuth isLogin={true} />} />
          <Route path="/driverRegister" element={<DriverAuth isLogin={false} />} />
          
          {/* Protected dashboard route */}
          <Route 
            path="/driverDashboard" 
            element={
              <PrivateRoute>
                <DriverDashboard />
              </PrivateRoute>
            } 
          />

          {/* Add the new tracking route - no authentication required */}
          <Route path="/track-delivery" element={<DriverTracking />} />

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

          {/** Delivery Routes */ }
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/delivery/login" element={<DriverLogin />} />
          <Route path="/delivery/order-confirm" element={<OrderConfirm />} />
         
          {/* Restaurant Routes */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
