import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClipboardList, faGavel, faEye, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FontAwesomeIcon icon={faHome} /> },
    { name: "Başvurular", path: "/applications", icon: <FontAwesomeIcon icon={faClipboardList} /> },
    { name: "Avukatlar", path: "/lawyers", icon: <FontAwesomeIcon icon={faGavel} /> },
    { name: "Davalar", path: "/cases", icon: <FontAwesomeIcon icon={faEye} /> },
    { name: "Hak İhlali İzleme", path: "/media-tracking", icon: <FontAwesomeIcon icon={faEye} /> },
  ];

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(!isOpen);
  };

  return (
    <div
      className={`bg-[#22333B] text-[#F2F4F3] min-h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed top-0 left-0 overflow-hidden`}
      onMouseEnter={handleSidebarToggle}
      onMouseLeave={handleSidebarToggle}
    >
      {/* Header */}
      <div className="text-xl font-bold p-4 border-b-2 border-[#0A0908]">
        <span>Admin Paneli</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg text-lg font-medium transition-all ${
                    isActive ? "bg-[#5E503F]" : "hover:bg-[#A9927D]"
                  }`
                }
              >
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t-2 border-[#0A0908]">
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            window.location.href = "/login";
          }}
          className="w-full py-2 bg-[#A9927D] text-[#0A0908] font-semibold rounded-lg hover:bg-[#5E503F] transition-all"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
