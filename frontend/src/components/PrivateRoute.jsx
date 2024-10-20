import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  // If token is not present, redirect to login page
  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  // If token exists, allow access to the route
  return children;
};

export default PrivateRoute;
