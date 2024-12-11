import React, { useState } from "react";
import axios from "axios";

const ViolationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    tcNo: "",
    violationType: "",
    description: "",
    file: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, tcNo, violationType, description, file } = formData;

    if (!fullName || !tcNo || !violationType || !description) {
      setError("Lütfen tüm alanları doldurun!");
      return;
    }

    if (!/^\d{11}$/.test(tcNo)) {
      setError("TC Kimlik Numarası 11 haneli olmalıdır!");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu 5 MB'yi geçemez.");
      return;
    }

    const data = new FormData();
    data.append("fullName", fullName);
    data.append("tcNo", tcNo);
    data.append("violationType", violationType);
    data.append("description", description);
    if (file) data.append("file", file);

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/violations", data);
      setSuccess("Başvurunuz başarıyla alındı.");
      setFormData({ fullName: "", tcNo: "", violationType: "", description: "", file: null });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Başvuru gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-bold text-[#4B3020] mb-6 text-center">
          Hak İhlali Başvuru Formu
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Ad Soyad</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Adınızı ve soyadınızı girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">TC Kimlik Numarası</label>
            <input
              type="text"
              name="tcNo"
              value={formData.tcNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="TC Kimlik numaranızı girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Başvuru Türü</label>
            <select
              name="violationType"
              value={formData.violationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              required
            >
              <option value="">Bir tür seçin</option>
              <option value="Ayrımcılık">Ayrımcılık</option>
              <option value="Kadına Şiddet">Kadına Şiddet</option>
              <option value="Yakınma">Yakınma</option>
              <option value="İş Yerinde Taciz">İş Yerinde Taciz</option>
              <option value="Siber Zorbalık">Siber Zorbalık</option>
              <option value="Mobbing">Mobbing</option>
              <option value="Taciz">Taciz</option>
              <option value="İş Yerinde Ayrımcılık">İş Yerinde Ayrımcılık</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B3020] mb-1">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D4C30]"
              placeholder="Mağduriyetiniz hakkında bilgi verin"
              rows="3"
              required
            />
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
