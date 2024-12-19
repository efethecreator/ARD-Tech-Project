import React, { useState } from 'react';
import ViolationsTable from './ViolationsTable';

const AdminHome = () => {
  const [currentPage, setCurrentPage] = useState(''); // Sayfa takibi

  const menuItems = [
    { name: 'Hak İhlalleri', page: 'violations' },
    { name: 'Başvurular', page: 'applications' },
    { name: 'Kullanıcı Yönetimi', page: 'user-management' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sol Menü */}
      <div className="w-1/4 bg-primary-dark text-background-light min-h-screen">
        <div className="p-5 font-bold text-xl border-b border-secondary-dark">
          Admin Paneli
        </div>
        <ul className="mt-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`p-4 cursor-pointer hover:bg-primary-light ${
                currentPage === item.page ? 'bg-primary-light' : ''
              }`}
              onClick={() => setCurrentPage(item.page)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Sağ İçerik */}
      <div className="w-3/4 bg-background-light p-6 min-h-screen">
        {/* İçerik Başlığı */}
        <div className="text-2xl font-semibold mb-4 text-primary">
          {currentPage ? menuItems.find((item) => item.page === currentPage)?.name : 'Hoş Geldiniz'}
        </div>

        {/* İçerik Gösterimi */}
        {currentPage === 'violations' && <ViolationsTable />}
        {currentPage === 'applications' && (
          <div className="bg-secondary-light p-4 rounded-lg shadow text-primary-dark">
            Başvurular sayfası henüz geliştirilmedi.
          </div>
        )}
        {currentPage === 'user-management' && (
          <div className="bg-secondary-light p-4 rounded-lg shadow text-primary-dark">
            Kullanıcı yönetimi sayfası henüz geliştirilmedi.
          </div>
        )}
        {!currentPage && (
          <div className="bg-secondary-light p-6 rounded-lg shadow text-primary-dark text-lg">
            Yönetim paneline hoş geldiniz! Soldaki menüden bir seçenek seçerek devam edebilirsiniz.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
