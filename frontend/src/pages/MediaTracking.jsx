import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import violationApi from "../api/violationApi";

const MediaTracking = () => {
  const [violations, setViolations] = useState([]);
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Backend'den hak ihlalleri verilerini çek
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await violationApi.getAllViolations();
        setViolations(response.data);
        setFilteredViolations(response.data);
      } catch (error) {
        console.error("Hak ihlalleri yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  // Arama Fonksiyonu
  const handleSearch = (query) => {
    const filtered = violations.filter((violation) =>
      violation.eventSummary?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredViolations(filtered);
  };

  // Filtreleme Fonksiyonu
  const handleFilter = (category) => {
    if (category) {
      const filtered = violations.filter(
        (violation) => violation.category === category
      );
      setFilteredViolations(filtered);
    } else {
      setFilteredViolations(violations);
    }
  };

  // Sayfalama İçin Veriyi Dilimle
  const paginatedViolations = filteredViolations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-[#f7f6f2] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#4e342e]">Hak İhlali İzleme</h1>

      {/* Yeni Hak İhlali Ekle Butonu */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/violations/add")}
          className="bg-[#6d4c41] text-white px-4 py-2 rounded hover:bg-[#5d4037] transition"
        >
          Yeni Hak İhlali Ekle
        </button>

        {/* Arama ve Filtreleme */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Olay Özeti Ara..."
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#8d6e63]"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-[#8d6e63]"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">Kategori Seç</option>
            <option value="Media Monitoring">Medya Taraması</option>
            <option value="NGO Data">STK Verileri</option>
            <option value="Bar Committees">Baro Komisyonları</option>
            <option value="Public Institutions">Kamu Kurumları</option>
          </select>
        </div>
      </div>

      {/* Tablo */}
      {loading ? (
        <div className="text-center text-gray-600">Yükleniyor...</div>
      ) : (
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
          <thead className="bg-[#4e342e] text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Dönem</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Olay Özeti</th>
              <th className="px-4 py-2">Kaynak</th>
              <th className="px-4 py-2">Görsel</th>
              <th className="px-4 py-2">Dosya</th>
              <th className="px-4 py-2">Detay</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedViolations.length > 0 ? (
              paginatedViolations.map((violation, index) => (
                <tr
                  key={violation._id}
                  className="hover:bg-[#f5f5f5] transition"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.scanPeriod || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.category || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.eventSummary || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.source || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.visualLink ? (
                      <a
                        href={violation.visualLink}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Görsel
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {violation.files?.[0]?.fileKey ? (
                      <a
                        href={violation.files[0].fileKey}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        Dosya
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/violations/${violation._id}`)}
                      className="bg-[#8d6e63] text-white px-3 py-1 rounded hover:bg-[#6d4c41] transition"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  Henüz hak ihlali kaydı bulunmamaktadır.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Sayfalama */}
      <div className="flex justify-center mt-6">
        {Array.from({
          length: Math.ceil(filteredViolations.length / itemsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 rounded transition ${
              currentPage === i + 1
                ? "bg-[#6d4c41] text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MediaTracking;
