import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import ProtectedRoute from './routes/ProtectedRoute';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
       
      </Routes>
   
  );
};

export default App;
