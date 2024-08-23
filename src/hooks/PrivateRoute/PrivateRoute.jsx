import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn");

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
