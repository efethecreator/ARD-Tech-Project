import React, { useState } from "react";
import axios from "axios";

const ViolationForm = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    applicationPhone: "",
    applicationEmail: "",
    applicantType: "",
    applicationReason: "",
    applicationType: "",
    companyName: "", // Opsiyonel alan
    companyType: "", // Opsiyonel alan
    status: "pending", // Varsayılan değer
    file: null, // Dosya
    resources: "", // Opsiyonel alan
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prevData) => ({
        ...prevData,
        file: files[0], // Dosya seçimi
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.trim(), // Diğer alanlar
      }));
    }
    console.log('Current form data:', formData); // Form verilerini loglama
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      idNumber,
      firstName,
      lastName,
      applicationPhone,
      applicationEmail,
      applicantType,
      applicationReason,
      applicationType,
      file,
    } = formData;
  
    // Validation - Zorunlu alanlar
    if (!idNumber || !firstName || !lastName || !applicationPhone || !applicationEmail || !applicantType || !applicationReason || !applicationType) {
      setError("Lütfen tüm gerekli alanları doldurun!");
      console.log('Validation failed. Missing fields:', formData);
      return;
    }
  
    if (!/^\d{11}$/.test(idNumber)) {
      setError("TC Kimlik Numarası 11 haneli olmalıdır!");
      console.log('Invalid TC number:', idNumber);
      return;
    }
  
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu 5 MB'yi geçemez.");
      console.log('File is too large:', file.size);
      return;
    }
  
    // FormData ile veri gönderimi
    const data = new FormData();
    data.append("idNumber", idNumber);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("applicationPhone", applicationPhone);
    data.append("applicationEmail", applicationEmail);
    data.append("applicantType", applicantType);  // Zorunlu
    data.append("applicationReason", applicationReason);  // Zorunlu
    data.append("applicationType", applicationType);
    if (file) data.append("file", file); // Dosya ekleniyor
    if (formData.companyName) data.append("companyName", formData.companyName);  // Opsiyonel alan
    if (formData.companyType) data.append("companyType", formData.companyType);  // Opsiyonel alan
    if (formData.resources) data.append("resources", formData.resources);  // Opsiyonel alan
  
    console.log('FormData before submit:', data);
  
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/applications", data, {
        headers: {
          "Content-Type": "multipart/form-data",  // Dosya gönderimi için header
        },
      });
  
      setSuccess("Başvurunuz başarıyla alındı.");
      setFormData({
        idNumber: "",
        firstName: "",
        lastName: "",
        applicationPhone: "",
        applicationEmail: "",
        applicantType: "",
        applicationReason: "",
        applicationType: "",
        companyName: "",
        companyType: "",
        status: "pending",
        file: null,
        resources: "",
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Başvuru gönderilemedi. Lütfen tekrar deneyin.");
      console.log('Error during submission:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-bold text-[#4B3020] mb-6 text-center">
          Başvuru Formu
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Zorunlu alanlar */}
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">TC Kimlik Numarası</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="TC Kimlik numaranızı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Ad</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Adınızı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Soyad</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Soyadınızı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Telefon</label>
            <input
              type="text"
              name="applicationPhone"
              value={formData.applicationPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Telefon numaranızı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">E-Posta</label>
            <input
              type="email"
              name="applicationEmail"
              value={formData.applicationEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>

          {/* Opsiyonel alanlar */}
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Şirket Adı</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Şirket adı (opsiyonel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Şirket Türü</label>
            <input
              type="text"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Şirket türü (opsiyonel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Başvuru Türü</label>
            <select
              name="applicationType"
              value={formData.applicationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              required
            >
              <option value="personal">Bireysel</option>
              <option value="corporate">Kurumsal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Dosya Yükle</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
            />
            {formData.file && (
              <p className="text-sm text-gray-500 mt-1">Seçilen dosya: {formData.file.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Kaynak URL</label>
            <input
              type="text"
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Kaynak URL'sini girin (opsiyonel)"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#6D4C30] hover:bg-[#4B3020] text-white py-2 rounded-lg transition duration-300 ${isSubmitting && "opacity-50"}`}
          >
            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViolationForm;
