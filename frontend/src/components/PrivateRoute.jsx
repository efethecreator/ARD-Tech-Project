import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    // Eğer token veya role eksikse, localStorage'dan yükle
    if (storedToken && storedRole && (!token || !role)) {
      useAuthStore.setState({
        token: storedToken,
        role: storedRole,
        isAuthenticated: true,
      });
    }
  }, [token, role]);

  // Kullanıcı doğrulanmamışsa login sayfasına yönlendir
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Rol yetkisi yoksa hata sayfasına yönlendir
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/error" replace />;
  }

  // Kullanıcı doğrulanmış ve yetkiliyse çocuk bileşenleri render et
  return <>{children}</>;
};

export default PrivateRoute;
