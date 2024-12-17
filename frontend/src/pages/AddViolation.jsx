import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import violationApi from "../api/violationApi";

const AddViolation = () => {
  const [formData, setFormData] = useState({
    scanPeriod: "",
    category: "",
    eventCategory: "",
    eventSummary: "",
    source: "",
    link: "",
    visualLink: "",
    notificationInstitution: "",
    commissionCase: "",
    publicInstitution: "",
    files: "", // Dosya linki olarak backend'e string gönderiyoruz
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Input değişikliklerini takip et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // JSON olarak backend'e gönderiyoruz
      await violationApi.createViolation(formData);
      alert("Hak ihlali başarıyla eklendi!");
      navigate("/media-tracking");
    } catch (error) {
      console.error("Hak ihlali eklenirken hata oluştu:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#f7f6f2] min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-[800px]">
        <h1 className="text-2xl font-semibold mb-4 text-center text-[#4e342e]">
          Yeni Hak İhlali Ekle
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              { label: "Dönem", name: "scanPeriod", type: "date" },
              { label: "Kategori", name: "category", type: "text" },
              { label: "Olay Kategorisi", name: "eventCategory", type: "text" },
              { label: "Olay Özeti", name: "eventSummary", type: "textarea" },
              { label: "Kaynak", name: "source", type: "text" },
              { label: "Link", name: "link", type: "text" },
              { label: "Görsel Link", name: "visualLink", type: "text" },
              { label: "Bildirim Kurumu", name: "notificationInstitution", type: "text" },
              { label: "Komisyon", name: "commissionCase", type: "text" },
              { label: "Kamu Kurumu", name: "publicInstitution", type: "text" },
              { label: "Dosya Linki", name: "files", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-[#5d4037]">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    rows="2"
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required={name === "scanPeriod" || name === "category"}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-[#6d4c41] text-white py-2 rounded hover:bg-[#5d4037] transition"
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddViolation;
