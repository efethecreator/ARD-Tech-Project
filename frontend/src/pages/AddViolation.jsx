import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import violationApi from "../api/violationApi"; // API import

const AddViolation = () => {
  const [category, setCategory] = useState(""); // Seçilen kategori
  const [formData, setFormData] = useState({
    scanPeriod: "",
    eventCategory: "",
    eventSummary: "",
    source: "",
    link: "",
    visualLink: "",
    notificationInstitution: "",
    commissionCase: "",
    publicInstitution: "",
    files: [], // Dosya yükleme alanı
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kategoriye özel alanlar
  const categoryFields = {
    "Media Monitoring": [
      "eventCategory",
      "eventSummary",
      "source",
      "link",
      "visualLink",
      "files",
    ],
    "NGO Data": ["eventCategory", "eventSummary", "notificationInstitution", "link", "files"],
    "Bar Committees": ["eventCategory", "eventSummary", "commissionCase", "link", "files"],
    "Public Institutions": ["eventCategory", "eventSummary", "publicInstitution", "link", "files"],
  };

  // Input değişikliklerini takip et
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (name === "files" && files.length > 0) {
      // Dosya adını alıp fileKey olarak ekle
      const fileKey = files[0].name;
      const updatedFiles = [
        ...formData.files,
        { fileKey, description: "Uploaded file" },
      ];
      setFormData({ ...formData, files: updatedFiles });
  
      // FormData oluştur ve dosyayı backend'e gönder
      const formDataToSend = new FormData();
      formDataToSend.append('file', files[0]); // Dosyayı ekle
  
      try {
        // Dosya yükleme fonksiyonunu çağır
        const response = await violationApi.uploadFile(formDataToSend);
        console.log("Dosya başarıyla yüklendi:", response);
      } catch (error) {
        console.error("Dosya yüklenemedi:", error);
      }
    } else if (name !== "files") {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  

  // Boş değerleri filtrele ve varsayılan değerler ekle
  const filterEmptyFields = (data) => {
    const defaultData = {
      source: "Not Provided",
      visualLink: "Not Available",
      notificationInstitution: "Not Provided",
      commissionCase: "Not Available",
      publicInstitution: "Not Available",
    };

    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (value === "" || value === undefined) {
          return [key, defaultData[key] || "Unknown"]; // Varsayılan değer ekle
        }
        return [key, value];
      })
    );
  };

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Boş değerleri filtrele ve kategori ekle
      const dataToSend = { ...filterEmptyFields(formData), category };
  
      // API çağrısı yap
      const response = await violationApi.createViolation(dataToSend);
      
      // Backend'den dönen yanıtı kontrol et
      if (response.status === 200) {
        alert("Hak ihlali başarıyla eklendi!");
        navigate("/violations");
      }
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

        {/* Kategori Seçimi */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#5d4037]">Kategori Seç</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Kategori Seç</option>
            <option value="Media Monitoring">Medya Taraması</option>
            <option value="NGO Data">STK Verileri</option>
            <option value="Bar Committees">Baro Komisyonları</option>
            <option value="Public Institutions">Kamu Kurumları</option>
          </select>
        </div>

        {/* Dinamik Form Alanları */}
        {category && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Ortak Alan: Tarama Dönemi */}
              <div>
                <label className="block mb-1 font-medium text-[#5d4037]">Tarama Dönemi</label>
                <input
                  type="date"
                  name="scanPeriod"
                  value={formData.scanPeriod}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              {/* Dinamik Alanlar */}
              {categoryFields[category].map((field) => (
                <div key={field}>
                  <label className="block mb-1 font-medium text-[#5d4037]">
                    {
                      {
                        eventCategory: "Olay Kategorisi",
                        eventSummary: "Olay Özeti",
                        source: "Kaynak",
                        link: "Link",
                        visualLink: "Görsel Link",
                        notificationInstitution: "Bildirim Kurumu",
                        commissionCase: "Vakayı Alan Komisyon",
                        publicInstitution: "Kamu Kurumu",
                        files: "Dosya Yükleme",
                      }[field]
                    }
                  </label>
                  <input
                    type={field === "files" ? "file" : "text"}
                    name={field}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required={field !== "files"}
                  />
                </div>
              ))}
            </div>

            {/* Gönder Butonu */}
            <button
              type="submit"
              className={`w-full bg-[#6d4c41] text-white py-2 rounded hover:bg-[#5d4037] transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddViolation;
