import React, { useEffect, useState } from "react";
import useApplicationStore from "../store/applicationStore";
import applicationApi from "../api/applicationApi";

const ApplicationList = () => {
  const { applications, fetchApplications, deleteApplication } =
    useApplicationStore();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    tcNo: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    applicantType: "",
    reason: "",
    applicationType: "",
    companyName: "",
    companyType: "",
    file: null,
  });

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form verisini FormData ile hazırlama
    const newApplication = new FormData();
    newApplication.append("idNumber", formData.tcNo);
    newApplication.append("firstName", formData.firstName);
    newApplication.append("lastName", formData.lastName);
    newApplication.append("applicationPhone", formData.phone);
    newApplication.append("applicationEmail", formData.email);
    newApplication.append("applicantType", formData.applicantType);
    newApplication.append("applicationReason", formData.reason);
    newApplication.append("applicationType", formData.applicationType);
    newApplication.append("companyName", formData.companyName || "");
    newApplication.append("companyType", formData.companyType || "");
    newApplication.append("status", "pending");

    // Eğer dosya varsa, dosya eklenir
    if (formData.file) {
      newApplication.append("file", formData.file); // Gerçek dosya verisini gönderiyoruz
    }

    console.log("Gönderilen Başvuru Verisi:", newApplication);

    try {
      await applicationApi.create(newApplication); // API'ye veri gönder
      fetchApplications(); // Yeni başvuruyu listele
      setFormData({
        tcNo: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        applicantType: "",
        reason: "",
        applicationType: "",
        companyName: "",
        companyType: "",
        file: null,
      });
      closePopup();
    } catch (error) {
      if (error.response) {
        console.error("API Hata Mesajı:", error.response.data); // Detaylı hata mesajı
      } else {
        console.error("Başvuru kaydedilirken hata oluştu:", error);
      }
    }
  };

  const openModal = (id) => {
    const app = applications.find((app) => app._id === id);
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Başvurular</h1>
        <button
          onClick={openPopup}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Hak İhlalleri Ekle
        </button>
      </div>

      <div className="overflow-y-auto max-h-[500px] p-4 bg-white rounded-lg shadow-md border">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">Hiç başvuru bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-gray-50 border rounded-lg shadow-sm p-4 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {app.firstName} {app.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {app.applicationReason || "Neden belirtilmedi"}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openModal(app._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Detayları Gör
                  </button>
                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="text-red-500 hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Hak İhlalleri Ekle
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                { label: "TC Kimlik Numarası", name: "tcNo" },
                { label: "Ad", name: "firstName" },
                { label: "Soyad", name: "lastName" },
                { label: "Telefon", name: "phone" },
                { label: "E-posta", name: "email" },
                { label: "Başvuran Türü", name: "applicantType" },
                { label: "Başvuru Nedeni", name: "reason" },
                { label: "Başvuru Tipi", name: "applicationType" },
                { label: "Şirket Adı (Opsiyonel)", name: "companyName" },
                { label: "Şirket Türü (Opsiyonel)", name: "companyType" },
              ].map((input, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {input.label}
                  </label>
                  <input
                    type="text"
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={`${input.label} girin`}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Dosya Yükle
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closePopup}
                  className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && selectedApplication && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Başvuru Detayları
            </h2>
            <p><strong>Ad:</strong> {selectedApplication.firstName}</p>
            <p><strong>Soyad:</strong> {selectedApplication.lastName}</p>
            <p><strong>Telefon:</strong> {selectedApplication.applicationPhone}</p>
            <p><strong>E-posta:</strong> {selectedApplication.applicationEmail}</p>
            <p><strong>Başvuru Nedeni:</strong> {selectedApplication.applicationReason}</p>
            <p><strong>Başvuru Tipi:</strong> {selectedApplication.applicationType}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
