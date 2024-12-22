import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore"; // Kullanıcı bilgisi için store kullanılıyor

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]); // Filtrelenmiş davalar
  const [selectedCase, setSelectedCase] = useState(null);
  const [applicationDetails, setApplicationDetails] = useState(null); // Başvuru detayları
  const [violations, setViolations] = useState([]); // Hak ihlalleri
  const [showModal, setShowModal] = useState(false);
  const [fileStatus, setFileStatus] = useState(""); // Durum güncellemek için state
  const [noCasesMessage, setNoCasesMessage] = useState(""); // Dava yoksa mesaj
  const [error, setError] = useState(null); // Hata durumları için state

  const navigate = useNavigate();
  const { role, userId } = useAuthStore(); // Kullanıcı bilgileri store'dan alınıyor

  // Davaları yükleme
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axiosClient.get("/cases");
        const allCases = response.data;

        if (role === "lawyer" && userId) {
          const lawyerCases = allCases.filter(
            (caseItem) =>
              caseItem.lawyerId && caseItem.lawyerId.toString() === userId.toString()
          );

          if (lawyerCases.length === 0) {
            setNoCasesMessage("Şu anda size atanmış bir dava bulunmamaktadır.");
            setFilteredCases([]);
          } else {
            setFilteredCases(lawyerCases);
            setNoCasesMessage("");
          }
        } else if (role === "admin") {
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

  // Hak ihlallerini her dava için yükleme
  const fetchViolations = async (caseId) => {
    try {
      const response = await axiosClient.get(`/violations?caseId=${caseId}`);
      console.log('API response for violations:', response.data);  // Veriyi kontrol et
      if (response.data.length === 0) {
        setError("Bu dava için hak ihlali bulunamadı.");
        setViolations([]);  // Eğer ihlaller yoksa temizle
      } else {
        setViolations(response.data);
      }
    } catch (error) {
      console.error("Hak ihlalleri çekilirken bir hata oluştu:", error);
      setError("Hak ihlalleri yüklenirken bir hata oluştu.");
      setViolations([]); // Hata durumunda boş bir dizi döndür
    }
  };

  // Modal açıldığında dava ve başvuru detaylarını ve ilişkili hak ihlalini yükleme
  const openModal = async (id, applicationId) => {
    setViolations([]); // Modal açıldığında önceki verileri temizle
    try {
      const response = await axiosClient.get(`/cases/${id}`);
      const caseData = response.data;

      // `protectedPersonTCNumber`'ı doğru şekilde dönüştür ve al
      caseData.protectedPersonTCNumber = caseData.protectedPersonTCNumber?.toString() || "";
      setSelectedCase(caseData);
      setFileStatus(caseData.result || "Belirtilmedi");

      if (applicationId) {
        const appResponse = await axiosClient.get(`/applications/${applicationId}`);
        setApplicationDetails(appResponse.data);
        
        // Başvuruya ait hak ihlali verisini getir
        if (appResponse.data.violationId) {
          const violationResponse = await axiosClient.get(`/violations/${appResponse.data.violationId}`);
          setViolations([violationResponse.data]);  // İhlali başvuru ile ilişkilendiriyoruz
        } else {
          setViolations([]); // Violation ID yoksa, boş bir ihlal listesi
        }
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching details:", error);
      setError("Veriler yüklenirken bir hata oluştu.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCase(null);
    setFileStatus("");
    setApplicationDetails(null);
    setViolations([]); // Modal kapanırken ihlalleri temizle
    setError(null);
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
      setError("Durum güncellenirken bir hata oluştu.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCase((prevCase) => ({
      ...prevCase,
      [name]: value,
    }));
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
              <h3 className="text-sm font-bold text-primary-dark mb-2">
                Mahkeme: {c.courtName}
              </h3>
              <p className="text-xs text-muted mb-1">
                <strong>Başvuru Numarası:</strong> {c.applicationId || "Belirtilmedi"}
              </p>
              <p className="text-xs text-muted mb-1">
                <strong>Durum:</strong> {c.result || "Belirtilmedi"}
              </p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => openModal(c._id, c.applicationId)}
                  className="bg-secondary-light text-white py-1 px-3 rounded hover:bg-secondary-dark transition"
                >
                  Detayları Gör
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => console.log(`Dava silindi: ${c._id}`)}
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 sm:w-2/3 lg:w-1/2 xl:w-1/3 flex gap-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-primary-dark hover:text-secondary-dark text-xl"
            >
              &times;
            </button>

            {/* Dava Detayları */}
            <div className="w-1/3">
              <h2 className="text-xl font-bold mb-4 text-primary-dark">Dava Detayları</h2>
              <div className="space-y-2 text-muted">
                <div>
                  <label className="block text-muted text-xs mb-1">Korunan Kişi Adı</label>
                  <input
                    name="protectedPersonName"
                    value={selectedCase.protectedPersonName || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Korunan Kişi Adı"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Korunan Kişi Soyadı</label>
                  <input
                    name="protectedPersonSurname"
                    value={selectedCase.protectedPersonSurname || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Korunan Kişi Soyadı"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Korunan Kişi TC Kimlik Numarası</label>
                  <input
                    name="protectedPersonTCNumber"
                    value={selectedCase.protectedPersonTCNumber || ""}
                    disabled
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Korunan Kişi TC Kimlik Numarası"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Dava Numarası</label>
                  <input
                    name="caseNumber"
                    value={selectedCase.caseNumber || ""}
                    disabled
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Dava Numarası"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Dava Nedeni</label>
                  <input
                    name="caseReason"
                    value={selectedCase.caseReason || ""}
                    disabled
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Dava Nedeni"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Mahkeme Adı</label>
                  <input
                    name="courtName"
                    value={selectedCase.courtName || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Mahkeme Adı"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">İddianame</label>
                  <textarea
                    name="indictment"
                    value={selectedCase.indictment || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="İddianame"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Sonuç</label>
                  <select
                    name="result"
                    value={fileStatus}
                    onChange={(e) => setFileStatus(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-xs"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Beklemede">Beklemede</option>
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted text-xs mb-1">Sonuç Aşaması</label>
                  <input
                    name="resultPhase"
                    value={selectedCase.resultPhase || ""}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1 text-xs"
                    placeholder="Sonuç Aşaması"
                  />
                </div>

                <button
                  onClick={handleStatusUpdate}
                  className="mt-4 bg-primary-light text-white px-3 py-1 rounded hover:bg-primary-dark transition"
                >
                  Durumu Güncelle
                </button>
              </div>
            </div>

            {/* Başvuru Detayları */}
            <div className="w-1/3 overflow-y-scroll h-80 border-l pl-4">
              <h2 className="text-lg font-bold mb-4 text-secondary-dark">Başvuru Detayları</h2>
              {applicationDetails ? (
                <div className="text-xs">
                  <p><strong>Ad:</strong> {applicationDetails.firstName}</p>
                  <p><strong>Soyad:</strong> {applicationDetails.lastName}</p>
                  <p><strong>Telefon Numarası:</strong> {applicationDetails.applicationPhone}</p>
                  <p><strong>E-posta:</strong> {applicationDetails.applicationEmail}</p>
                  <p><strong>Başvuru Türü:</strong> {applicationDetails.applicantType}</p>
                  <p><strong>Başvuru Nedeni:</strong> {applicationDetails.applicationReason}</p>
                  <p><strong>Başvuru Tipi:</strong> {applicationDetails.applicationType}</p>
                  <p><strong>Firma Adı:</strong> {applicationDetails.companyName}</p>
                  <p><strong>Firma Türü:</strong> {applicationDetails.companyType}</p>
                  <p><strong>Durum:</strong> {applicationDetails.status}</p>
                </div>
              ) : (
                <p className="text-gray-500">Yükleniyor...</p>
              )}

              {/* Hak İhlalleri */}
              <h2 className="text-lg font-bold mb-4 text-secondary-dark mt-6">Hak İhlalleri</h2>
              {violations.length > 0 ? (
                violations.map((violation) => (
                  <div key={violation._id} className="text-xs mb-2">
                    <p><strong>Kategori:</strong> {violation.category}</p>
                    <p><strong>Olay Özeti:</strong> {violation.eventSummary}</p>
                    <p><strong>Kaynak:</strong> {violation.source}</p>
                    <p><strong>Link:</strong> <a href={violation.link} target="_blank" rel="noopener noreferrer">{violation.link}</a></p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">İhlaller bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
