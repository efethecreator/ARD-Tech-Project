import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faGavel,
  faEye,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Sidebar = ({ setSidebarOpen, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRestrictedAccess = () => {
    Swal.fire({
      icon: "warning",
      title: "Yetkisiz Erişim",
      text: "Bu bölüme erişim yetkiniz yok.",
    });
  };

  const menuItems = role === "admin" ? [
    { name: "Anasayfa", path: "/", icon: <FontAwesomeIcon icon={faHome} /> },
    { name: "Başvurular", path: "/applications", icon: <FontAwesomeIcon icon={faClipboardList} /> },
    { name: "Kullanıcılar", path: "/users", icon: <FontAwesomeIcon icon={faGavel} /> },
    { name: "Davalar", path: "/cases", icon: <FontAwesomeIcon icon={faEye} /> },
  ] : [
    { name: "Davalar", path: "/cases", icon: <FontAwesomeIcon icon={faEye} /> },
  ];

  return (
    <div
      className={`bg-primary-dark text-white min-h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed top-0 left-0`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setSidebarOpen(!isOpen);
        }}
        className="p-4 text-white focus:outline-none hover:bg-primary-light transition"
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg text-lg font-medium transition-all ${
                    isActive ? "bg-primary-light" : "hover:bg-primary-muted"
                  }`
                }
              >
                {item.icon}
                {isOpen && <span className="ml-4">{item.name}</span>}
              </NavLink>
            </li>
          ))}
          {role === "lawyer" && (
            <li>
              <button
                onClick={handleRestrictedAccess}
                className="flex items-center p-3 rounded-lg text-lg font-medium w-full text-left hover:bg-primary-muted"
              >
                <FontAwesomeIcon icon={faClipboardList} />
                {isOpen && <span className="ml-4">Diğer Bölümler</span>}
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t-2 border-primary-light">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full py-2 bg-error text-white font-semibold rounded-lg hover:bg-error-dark transition-all flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          {isOpen && <span className="ml-2">Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
