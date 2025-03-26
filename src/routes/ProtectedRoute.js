// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  // Assume you are checking token from local storage for authentication
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
