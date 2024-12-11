import React from 'react';

const CaseForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dava formu gönderildi');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dava Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Dava Adı</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Dava adını girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dava Durumu</label>
          <select className="w-full border border-gray-300 rounded p-2" required>
            <option value="">Durum Seçin</option>
            <option value="beklemede">Beklemede</option>
            <option value="devam">Devam Ediyor</option>
            <option value="tamamlandi">Tamamlandı</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dava Açıklaması</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Dava açıklamasını girin"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
