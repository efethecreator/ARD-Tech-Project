import React, { useState } from "react";
import applicationApi from "../api/applicationApi";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    applicationPhone: "",
    applicationEmail: "",
    applicantType: "Bireysel", // Varsayılan başvuru türü
    applicationReason: "",
    applicationType: "",
    companyName: "",
    companyType: "",
  });

  const [violationData, setViolationData] = useState({
    scanPeriod: "",
    eventCategory: "",
    eventSummary: "",
    source: "",
    link: "",
    visualLink: "",
    file: [],
    notificationInstitution: "",
    commissionCase: "",
    publicInstitution: "",
    file: "",
  });

  const [category, setCategory] = useState("");  // Kategori seçimi
  const [file, setFile] = useState(null);
  const [isViolationOpen, setIsViolationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Başvuru türüne göre dinamik alanlar
  const applicantTypeFields = {
    Bireysel: ["idNumber", "firstName", "lastName", "applicationPhone", "applicationEmail", "applicationReason", "applicationType"],
    Kurumsal: ["idNumber", "firstName", "lastName", "applicationPhone", "applicationEmail", "companyName", "companyType", "applicationReason", "applicationType"],
  };

  // Başvuru nedenleri
  const applicationReasons = [
    "Kadına Karşı Şiddet", 
    "Yaralama", 
    "Ayrımcılık", 
    "İşkence", 
    "Çocuğa Karşı Şiddet",
    "Özgürlük Kısıtlaması"
  ];

  // Hak ihlali kategorilerine göre form alanları
  const violationCategoryFields = {
    "Medya Taraması": ["scanPeriod", "eventCategory", "eventSummary", "source", "link", "visualLink", "file"],  // visualLink ekledik
    "STK Verileri": ["scanPeriod", "eventCategory", "eventSummary", "notificationInstitution", "link", "file"],
    "Baro Komisyonları": ["scanPeriod", "eventCategory", "eventSummary", "commissionCase", "link", "file"],
    "Kamu Kurumları": ["scanPeriod", "eventCategory", "eventSummary", "publicInstitution", "link", "file"]
  };
  

  const labels = {
    idNumber: "Kimlik Numarası",
    firstName: "Ad",
    lastName: "Soyad",
    applicationPhone: "Telefon Numarası",
    applicationEmail: "E-posta Adresi",
    applicantType: "Başvuru Türü (Bireysel/Kurumsal)",
    applicationReason: "Başvuru Nedeni",
    applicationType: "Başvuru Tipi",
    companyName: "Şirket Adı",
    companyType: "Şirket Türü",
    violationCategory: "Hak İhlali Kategorisi",
    scanPeriod: "Tarama Dönemi",
    eventCategory: "Olay Kategorisi",
    eventSummary: "Olay Özeti",
    source: "Kaynak",
    link: "Link",
    visualLink: "Görsel Link",
    files: "Dosyalar",
    notificationInstitution: "Bildirim Kurumu",
    commissionCase: "Komisyon Vakasına Alındı",
    publicInstitution: "Kamu Kurumu",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleViolationChange = (e) => {
    const { name, value } = e.target;
    setViolationData({ ...violationData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Başvuru formu için zorunlu alan kontrolü
    const requiredFields = applicantTypeFields[formData.applicantType];
    const missingFields = requiredFields.filter((field) => !formData[field]?.trim());
  
    if (missingFields.length > 0) {
      alert(`Lütfen zorunlu alanları doldurun: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }
  
    const applicationData = new FormData();
    Object.keys(formData).forEach((key) => applicationData.append(key, formData[key].trim()));
    if (file) applicationData.append("file", file);
  
    try {
      const applicationResponse = await applicationApi.createApplication(applicationData);
      const applicationId = applicationResponse?.data?.data?._id;
  
      if (!applicationId) {
        throw new Error("Başvuru ID alınamadı!");
      }
  
      // Hak ihlali ekleme işlemi (Opsiyonel)
      if (isViolationOpen && category) {
        const requiredViolationFields = violationCategoryFields[category];
        const missingViolationFields = requiredViolationFields.filter((field) => {
          return field === "file" ? !file : !violationData[field]?.trim();
        });
  
        if (missingViolationFields.length > 0) {
          alert(`Hak ihlali için eksik alanlar: ${missingViolationFields.join(", ")}`);
          setLoading(false);
          return;
        }
  
        const violationPayload = new FormData();
        violationPayload.append("category", category);
        
        // Hak ihlali form alanlarını ekliyoruz
        requiredViolationFields.forEach((field) => {
          if (field === "file" && file) {
            violationPayload.append("files[0][fileKey]", file.name);  // Dosya adı
            violationPayload.append("files[0][description]", "File description");  // Dosya açıklaması
          } else {
            violationPayload.append(field, violationData[field] || "");
          }
        });
  
        try {
          const violationResponse = await applicationApi.createViolation(violationPayload);
          const violationId = violationResponse?.data?._id;
  
          if (!violationId) {
            throw new Error("Hak ihlali ID alınamadı!");
          }
  
          await applicationApi.addViolation(applicationId, { violationId });
        } catch (error) {
          console.error("Hak ihlali gönderim hatası:", error);
          alert("Hak ihlali gönderilemedi. Lütfen tekrar deneyin.");
        }
      }
  
      alert("Başvuru başarıyla kaydedildi!");
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };
  

  const displayedFields = applicantTypeFields[formData.applicantType];

  return (
<div className="p-2 bg-[#c0c0c0] flex items-center justify-center min-h-screen">
  <div className="bg-[#F2F4F3] p-4 rounded-lg shadow-md w-full max-w-screen-lg">
    <h1 className="text-base font-semibold text-[#0A0908] text-center mb-2">Mağdur Başvuru Formu</h1>
    <p className="text-xs text-[#22333B] text-center mb-2">
      Lütfen aşağıdaki formu doldurarak başvurunuzu tamamlayın. Hak ihlali eklemek istiyorsanız, ilgili seçeneği açabilirsiniz.
    </p>
    <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Applicant Type Selection */}
      <div className="col-span-2">
        <label className="block text-xs font-medium text-[#0A0908]">{labels["applicantType"]}</label>
        <select
          name="applicantType"
          value={formData.applicantType}
          onChange={handleInputChange}
          className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
        >
          <option value="Bireysel">Bireysel</option>
          <option value="Kurumsal">Kurumsal</option>
        </select>
      </div>

      {/* Display Applicant Fields */}
      {displayedFields.map((key) => (
        <div key={key}>
          <label className="block text-xs font-medium text-[#0A0908]">{labels[key]}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
            className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
          />
        </div>
      ))}

      {/* Application Reason */}
      <div className="col-span-2">
        <label className="block text-xs font-medium text-[#0A0908]">{labels["applicationReason"]}</label>
        <select
          name="applicationReason"
          value={formData.applicationReason}
          onChange={handleInputChange}
          className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
        >
          <option value="">Başvuru Nedeni Seç</option>
          {applicationReasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div className="col-span-2">
        <label className="block text-xs font-medium text-[#0A0908]">Dosya Yükle</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
        />
      </div>

      {/* Violation Section Toggle */}
      <div className="col-span-2 text-center">
        <button
          type="button"
          onClick={() => setIsViolationOpen(!isViolationOpen)}
          className="bg-[#5E503F] text-white px-3 py-1 rounded text-xs shadow hover:bg-[#594A3A] transition"
        >
          {isViolationOpen ? "Hak İhlali Kapat" : "Hak İhlali Ekle"}
        </button>
      </div>

      {isViolationOpen && (
  <div className="col-span-2 bg-[#E6E8E6] p-3 rounded shadow-inner">
    <h2 className="text-xs font-semibold text-[#0A0908] mb-2">Hak İhlali Bilgileri</h2>

    {/* Kategori Seçimi */}
    <div className="mb-4">
      <label className="block text-xs font-medium text-[#0A0908]">Kategori</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
      >
        <option value="">Kategori Seç</option>
        {Object.keys(violationCategoryFields).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    {/* Dinamik Olarak Gösterilen Alanlar */}
    {category && violationCategoryFields[category].map((field) => (
      <div className="mb-4" key={field}>
        <label className="block text-xs font-medium text-[#0A0908]">{labels[field]}</label>
        {field === "file" ? (
          <input
            type="file"
            name={field}
            onChange={handleFileChange}
            className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
          />
        ) : (
          <input
            type={field === "link" || field === "visualLink" ? "url" : "text"}
            name={field}
            value={violationData[field] || ""}
            onChange={handleViolationChange}
            className="border p-1 rounded w-full text-xs focus:outline-none focus:ring focus:ring-[#A9927D]"
          />
        )}
      </div>
    ))}
  </div>
)}


      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          className="bg-[#22333B] text-white px-4 py-1 rounded w-full text-xs shadow hover:bg-[#1E2B31] transition"
          disabled={loading}
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>
    </form>
  </div>
</div>



  );
};

export default ApplicationForm;
