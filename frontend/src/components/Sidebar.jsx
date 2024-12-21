import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Menü öğelerini tanımla
  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Başvurular', path: '/applications' },
    { name: 'Kullanıcılar', path: '/users' },
    { name: 'Davalar', path: '/cases' },
    { name: 'Hak İhlali İzleme', path: '/media-tracking' },
  ];

  return (
    <div className="bg-primary-dark text-secondary-light h-full">
      <div className="text-xl font-bold p-4 border-b border-secondary-dark">
        <span>Admin Panel</span>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded hover:bg-primary-light ${isActive ? 'bg-primary-light' : ''}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          onClick={() => {
            localStorage.removeItem("isAuthenticated"); // Kullanıcıyı sistemden çıkar
            window.location.href = "/login"; // Giriş sayfasına yönlendir
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
