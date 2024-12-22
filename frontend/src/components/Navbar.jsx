import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { role, userId, name, surname } = useAuthStore();

  return (
    <div className="bg-primary text-secondary-dark shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 text-sm">
            <p>
              {name} {surname}
            </p>
            <p>Rol: {role}</p>
            <p>ID: {userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
