import React from "react";
import useAuthStore from "../store/authStore";
import { FaUserShield, FaGavel } from "react-icons/fa"; // React Icons'dan simgeler eklendi

const Navbar = () => {
  const { role, userId, name, surname } = useAuthStore();

  // Kullanıcı rolüne göre simge seçimi
  const getRoleIcon = () => {
    if (role === "admin") return <FaUserShield className="text-secondary-dark text-2xl" />;
    if (role === "lawyer") return <FaGavel className="text-secondary-dark text-2xl" />;
    return null; // Varsayılan durum: Simge yok
  };

  return (
    <div className="bg-primary text-secondary-dark shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Yönetim Paneli</div>
      <div className="flex items-center space-x-4">
        {/* Kullanıcı Bilgileri */}
        <div className="flex items-center">
    
          <div className="ml-2 text-sm">
            <p>
              {name} {surname}
            </p>
            <p>Rol: {role}</p>
            <p>ID: {userId}</p>
          </div>
        </div>
        {/* Kullanıcı Rolüne Göre Simge */}
        {getRoleIcon()}
      </div>
    </div>
  );
};

export default Navbar;
