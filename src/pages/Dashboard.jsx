// src/pages/Dashboard.jsx
import React from 'react';
import ProtectedRoute from '../routes/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Admin Dashboard</h1>
        {/* Admin dashboard content */}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
