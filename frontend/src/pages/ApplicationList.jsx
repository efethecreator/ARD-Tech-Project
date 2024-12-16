import React, { useEffect, useState } from "react";
import useApplicationStore from "../store/applicationStore";
import applicationApi from "../api/applicationApi";

const ApplicationList = () => {
  const { applications, fetchApplications, deleteApplication } =
    useApplicationStore();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openModal = async (id) => {
    try {
      const response = await applicationApi.getById(id);
      setSelectedApplication(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError("Başvuru detayları alınırken bir hata oluştu.");
    }
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
    setError("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Başvurular</h1>

      <div className="overflow-y-auto max-h-[500px] p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">Hiç başvuru bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
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
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Detayları Gör
                  </button>
                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">Başvuru Detayları</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {selectedApplication ? (
              <div>
                <p>
                  <strong>Ad:</strong> {selectedApplication.firstName}
                </p>
                <p>
                  <strong>Soyad:</strong> {selectedApplication.lastName}
                </p>
                <p>
                  <strong>Telefon:</strong> {selectedApplication.applicationPhone}
                </p>
                <p>
                  <strong>E-posta:</strong> {selectedApplication.applicationEmail}
                </p>
                <p>
                  <strong>Başvuru Nedeni:</strong> {selectedApplication.applicationReason}
                </p>
                <p>
                  <strong>Başvuru Tipi:</strong> {selectedApplication.applicationType}
                </p>
                <p>
                  <strong>Durum:</strong> {selectedApplication.status}
                </p>
              </div>
            ) : (
              <p>Detaylar yükleniyor...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
