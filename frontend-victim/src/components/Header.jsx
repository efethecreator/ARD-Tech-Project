import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-dark text-secondary-light p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">Hak İhlali Başvuru Formu</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-secondary-light">Ana Sayfa</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
