import React, { useState } from 'react';

function ViolationAddPopup({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    scanPeriod: '',
    eventCategory: '',
    eventSummary: '',
    source: '',
    link: '',
    imageLink: '',
    fileUpload: null,
    dataSource: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Kaydedilen veriler tabloya eklenir
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Violation Ekle</h2>
        <form onSubmit={handleSubmit}>
          {/* Tarama Dönemi */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Tarama Dönemi:</label>
            <input
              type="text"
              name="scanPeriod"
              value={formData.scanPeriod}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Olay Kategorisi */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Olay Kategorisi:</label>
            <input
              type="text"
              name="eventCategory"
              value={formData.eventCategory}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Olay Özet */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Olay Özet:</label>
            <textarea
              name="eventSummary"
              value={formData.eventSummary}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Kaynak */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Kaynak (Web sitesi, Gazete vb.):</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Link:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Görsel Link */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Görsel Link:</label>
            <input
              type="text"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Dosya Yükleme */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Dosya Yükleme:</label>
            <input
              type="file"
              name="fileUpload"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Veri Kaynağı:</label>
            <select
              name="dataSource"
              value={formData.dataSource}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
            >
              <option value="">Seçiniz</option>
              <option value="Medya Taraması">Medya Taraması</option>
              <option value="STK Verileri">STK Verileri</option>
              <option value="Baro Komisyonları">Baro Komisyonları</option>
              <option value="Kamu Kurumları">Kamu Kurumları</option>
            </select>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViolationAddPopup;
