import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore"; // Kullanıcı bilgisi için store kullanılıyor

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]); // Filtrelenmiş davalar
  const [selectedCase, setSelectedCase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileStatus, setFileStatus] = useState(""); // Durum güncellemek için state
  const [noCasesMessage, setNoCasesMessage] = useState(""); // Dava yoksa mesaj

  const navigate = useNavigate();
  const { role, userId } = useAuthStore(); // Kullanıcı bilgileri store'dan alınıyor

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axiosClient.get("/cases");
        const allCases = response.data;

        if (role === "lawyer" && userId) {
          // LawyerId eşleştirilerek avukatın atanmış davaları filtreleniyor
          const lawyerCases = allCases.filter(
            (caseItem) =>
              caseItem.lawyerId && caseItem.lawyerId.toString() === userId.toString()
          );

          console.log("Avukata Atanan Davalar:", lawyerCases);

          if (lawyerCases.length === 0) {
            setNoCasesMessage("Şu anda size atanmış bir dava bulunmamaktadır.");
            setFilteredCases([]);
          } else {
            setFilteredCases(lawyerCases);
            setNoCasesMessage("");
          }
        } else if (role === "admin") {
          // Admin tüm davaları görür
          setFilteredCases(allCases);
        } else {
          setNoCasesMessage("Davalar görüntülenemiyor. Lütfen tekrar giriş yapınız.");
        }
      } catch (error) {
        console.error("Davalar çekilirken bir hata oluştu:", error);
        setNoCasesMessage("Davalar yüklenirken bir hata oluştu.");
      }
    };

    if (userId) fetchCases();
  }, [role, userId]);

  const openModal = async (id) => {
    try {
      const response = await axiosClient.get(`/cases/${id}`);
      setSelectedCase(response.data);
      setFileStatus(response.data.result || "Belirtilmedi");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching case details:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCase(null);
    setFileStatus("");
  };

  const handleStatusUpdate = async () => {
    try {
      const updatedData = { ...selectedCase, result: fileStatus };
      await axiosClient.put(`/cases/${selectedCase._id}`, updatedData);
      setFilteredCases((prev) =>
        prev.map((c) => (c._id === selectedCase._id ? updatedData : c))
      );
      closeModal();
    } catch (error) {
      console.error("Error updating case status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/cases/${id}`);
      setFilteredCases((prev) => prev.filter((c) => c._id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting case:", error);
    }
  };

  return (
    <div className="p-6 bg-background-light min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-dark">Davalar</h1>
        {role === "admin" && (
          <button
            onClick={() => navigate("/cases/new")}
            className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300"
          >
            + Yeni Dava Ekle
          </button>
        )}
      </div>

      {/* No Cases Message */}
      {noCasesMessage ? (
        <p className="text-center text-gray-500">{noCasesMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-border rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col"
            >
              <h3 className="text-lg font-bold text-primary-dark mb-2">
                Mahkeme: {c.courtName}
              </h3>
              <p className="text-sm text-muted mb-1">
                <strong>Başvuru ID:</strong> {c.applicationId}
              </p>
              <p className="text-sm text-muted mb-1">
                <strong>Durum:</strong> {c.result || "Belirtilmedi"}
              </p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => openModal(c._id)}
                  className="bg-secondary-light text-white py-1 px-3 rounded hover:bg-secondary-dark transition"
                >
                  Detayları Gör
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-primary-dark hover:text-secondary-dark text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary-dark text-center">
              Dava Detayları
            </h2>
            <div className="space-y-4 text-muted">
              <p>
                <strong>Mahkeme:</strong> {selectedCase.courtName}
              </p>
              <p>
                <strong>Başvuru ID:</strong> {selectedCase.applicationId}
              </p>
              <p>
                <strong>Korunan Kişi:</strong>{" "}
                {selectedCase.protectedPersonName}{" "}
                {selectedCase.protectedPersonSurname}
              </p>
              <p>
                <strong>TC Kimlik Numarası:</strong>{" "}
                {selectedCase.protectedPersonTCNumber}
              </p>
              <p>
                <strong>Dava Nedeni:</strong> {selectedCase.caseReason}
              </p>
              <p>
                <strong>Sonuç:</strong> {selectedCase.result || "Belirtilmedi"}
              </p>
              <label className="block font-bold mb-2">Durumu Güncelle</label>
              <select
                value={fileStatus}
                onChange={(e) => setFileStatus(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Seçiniz</option>
                <option value="Beklemede">Beklemede</option>
                <option value="İnceleniyor">İnceleniyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="mt-4 bg-primary-light text-white px-4 py-2 rounded hover:bg-primary-dark transition"
              >
                Durumu Güncelle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
