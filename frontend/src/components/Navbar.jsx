import React from 'react';

const Navbar = () => {
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
          <span className="ml-2">Kullanıcı</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
