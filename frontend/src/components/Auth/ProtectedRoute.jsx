import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("appCertificate");

  if (!token) return <Navigate to="/" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    if (userRole === allowedRole) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } catch (e) {
    console.error("Invalid token:", e);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
