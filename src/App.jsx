import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';

const App = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
      </Routes>
    
  );
};

export default App;
