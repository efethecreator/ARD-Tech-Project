import React from 'react';

const MediaTracking = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hak İhlali İzleme</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Dönem</th>
            <th className="border border-gray-300 p-2">Kategori</th>
            <th className="border border-gray-300 p-2">Olay Özeti</th>
            <th className="border border-gray-300 p-2">Kaynak</th>
            <th className="border border-gray-300 p-2">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" className="border border-gray-300 p-2 text-center">
              Henüz hak ihlali kaydı bulunmamaktadır.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MediaTracking;
