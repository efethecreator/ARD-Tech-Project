import React from 'react';

const ApplicationForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form gönderildi');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Başvuru Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Adı</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Adınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Soyadı</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Soyadınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Başvuru Tarihi</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Başvuru Türü</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="">Seçiniz</option>
            <option value="individual">Bireysel</option>
            <option value="corporate">Kurumsal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">İhlal Nedeni</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="İhlal nedenini yazın"
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

export default ApplicationForm;
