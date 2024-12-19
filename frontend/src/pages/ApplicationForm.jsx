import React from 'react';

const ApplicationForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form gönderildi');
  };

  return (
    <div className="p-6 bg-[#F2F4F3] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#0A0908]">Başvuru Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#A9927D] p-6 rounded shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0A0908]">Adı</label>
          <input
            type="text"
            className="w-full border border-[#5E503F] rounded p-2"
            placeholder="Adınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0A0908]">Soyadı</label>
          <input
            type="text"
            className="w-full border border-[#5E503F] rounded p-2"
            placeholder="Soyadınızı girin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0A0908]">Başvuru Tarihi</label>
          <input
            type="date"
            className="w-full border border-[#5E503F] rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0A0908]">Başvuru Türü</label>
          <select
            className="w-full border border-[#5E503F] rounded p-2"
            required
          >
            <option value="">Seçiniz</option>
            <option value="individual">Bireysel</option>
            <option value="corporate">Kurumsal</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#0A0908]">İhlal Nedeni</label>
          <textarea
            className="w-full border border-[#5E503F] rounded p-2"
            placeholder="İhlal nedenini yazın"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#22333B] text-[#F2F4F3] py-2 px-4 rounded hover:bg-[#5E503F]"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
