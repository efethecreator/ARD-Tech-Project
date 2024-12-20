import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faClipboardList,
  faGavel,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: faHome },
    { name: "Başvurular", path: "/applications", icon: faClipboardList },
    { name: "Avukatlar", path: "/lawyers", icon: faGavel },
    { name: "Davalar", path: "/cases", icon: faEye },
    { name: "Hak İhlali İzleme", path: "/media-tracking", icon: faEye },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Menü durumunu üst bileşene aktar

  return (
    <div
      className={`bg-[#22333B] text-[#F2F4F3] h-full transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-20"
      } fixed top-0 left-0 shadow-md flex flex-col`}
    >
      {/* Navbar Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#F2F4F3]">
        <span className="text-xl font-bold">
          {isMenuOpen && "Admin Paneli"}
        </span>
        <button
          onClick={toggleMenu}
          className="text-[#F2F4F3] focus:outline-none"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-all hover:bg-[#A9927D] ${
                  isMenuOpen ? "justify-start" : "justify-center"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                {isMenuOpen && (
                  <span className="ml-4 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
