import React, { useState } from "react";

const VictimForm = () => {
  const [formData, setFormData] = useState({
    tc: "",
    name: "",
    surname: "",
    applicationType: "individual",
    issueType: "discrimination",
    description: "",
    attachment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          attachment: reader.result, // Base64 formatında kaydedilir
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Başvuruyu localStorage'a kaydet
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(formData);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Başvurunuz alınmıştır!");
    setFormData({
      tc: "",
      name: "",
      surname: "",
      applicationType: "individual",
      issueType: "discrimination",
      description: "",
      attachment: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Başvuru Formu</h1>
        {/* TC Kimlik Numarası */}
        <div className="mb-4">
          <label className="block mb-1">TC Kimlik Numarası</label>
          <input
            type="text"
            name="tc"
            value={formData.tc}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Ad */}
        <div className="mb-4">
          <label className="block mb-1">Ad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Soyad */}
        <div className="mb-4">
          <label className="block mb-1">Soyad</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Başvuru Türü */}
        <div className="mb-4">
          <label className="block mb-1">Başvuru Türü</label>
          <select
            name="applicationType"
            value={formData.applicationType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="individual">Bireysel</option>
            <option value="corporate">Kurumsal</option>
          </select>
        </div>
        {/* Sorun Türü */}
        <div className="mb-4">
          <label className="block mb-1">Sorun Türü</label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="discrimination">Ayrımcılık</option>
            <option value="violence">Kadına Şiddet</option>
            <option value="complaint">Yakınma</option>
            <option value="other">Diğer</option>
          </select>
        </div>
        {/* Dosya Ekleme */}
        <div className="mb-4">
          <label className="block mb-1">Dosya Ekle</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          {formData.attachment && (
            <p className="text-sm mt-1">Dosya yüklendi!</p>
          )}
        </div>
        {/* Açıklama */}
        <div className="mb-4">
          <label className="block mb-1">Açıklama</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
            required
          ></textarea>
        </div>
        {/* Gönder Butonu */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default VictimForm;
