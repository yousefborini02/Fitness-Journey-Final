import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // Retrieve the JWT token from the 'token' cookie
  const token = Cookies.get('token');  // 'token' is the name of the cookie where the JWT is stored
  console.log("token", token);
  

  if (!token) {
    // If no token is found, redirect the user to the login page
    return <Navigate to="/login" />;
  }

  // If the token exists, render the protected component
  return children;
};

export default ProtectedRoute;
