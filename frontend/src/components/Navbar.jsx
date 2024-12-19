import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#22333B] text-[#F2F4F3] shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <span>Admin Paneli</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#F2F4F3] focus:outline-none"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-[#F2F4F3] text-[#0A0908] p-4 rounded-lg shadow-lg">
            <ul>
              <li>
                <Link to="/" className="block py-2 px-4 hover:bg-[#A9927D]">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/applications" className="block py-2 px-4 hover:bg-[#A9927D]">
                  Başvurular
                </Link>
              </li>
              <li>
                <Link to="/lawyers" className="block py-2 px-4 hover:bg-[#A9927D]">
                  Avukatlar
                </Link>
              </li>
              <li>
                <Link to="/cases" className="block py-2 px-4 hover:bg-[#A9927D]">
                  Davalar
                </Link>
              </li>
              <li>
                <Link to="/media-tracking" className="block py-2 px-4 hover:bg-[#A9927D]">
                  Hak İhlali İzleme
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
