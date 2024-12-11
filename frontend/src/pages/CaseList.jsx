import React from 'react';

const CaseList = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Davalar</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Dava Adı</th>
            <th className="border border-gray-300 p-2">Başlangıç Tarihi</th>
            <th className="border border-gray-300 p-2">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="border border-gray-300 p-2 text-center">
              Henüz kayıtlı dava bulunmamaktadır.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CaseList;
