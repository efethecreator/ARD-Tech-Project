import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      // Eğer localStorage'da token varsa store'a set et
      useAuthStore.setState({ token: storedToken, isAuthenticated: true });
    }
  }, [token]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
