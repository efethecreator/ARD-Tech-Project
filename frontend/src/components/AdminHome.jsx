import React, { useState } from 'react';
import ViolationsTable from './ViolationsTable';

function AdminHome() {
  const [currentPage, setCurrentPage] = useState(''); // Sayfa takibi

  return (
    <div className="flex">
      {/* Sol Menü */}
      <div className="w-1/4 bg-gray-800 text-white min-h-screen">
        <div className="p-5 font-bold text-lg">Admin Paneli</div>
        <ul>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => setCurrentPage('violations')} // "Hak İhlalleri" tıklandığında tablo açılır
          >
            Hak İhlalleri
          </li>
        </ul>
      </div>

      {/* Sağ İçerik */}
      <div className="w-3/4 p-5">
        {currentPage === 'violations' && <ViolationsTable />}
      </div>
    </div>
  );
}

export default AdminHome;
