import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { register } from "../api/authapi";

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const [newLawyer, setNewLawyer] = useState({
    name: "",
    surname: "",
    TCNumber: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    userRole: "lawyer",
  });

  // Avukatları Backend'den Çekme
  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/users/lawyers");
      setLawyers(response.data);
    } catch (error) {
      console.error("Avukatları alırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Yeni Avukat Ekleme İşlemi
  const handleAddLawyer = async () => {
    try {
      await register(newLawyer);
      setShowAddModal(false);
      fetchLawyers();
      setNewLawyer({
        name: "",
        surname: "",
        TCNumber: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        userRole: "lawyer",
      });
    } catch (error) {
      console.error("Avukat eklenirken hata oluştu:", error);
    }
  };

  // Avukat Silme İşlemi (Onaylı)
  const handleDeleteLawyer = async (id) => {
    if (window.confirm("Bu avukatı silmek istediğinizden emin misiniz?")) {
      try {
        await axiosClient.delete(`/users/${id}`);
        fetchLawyers();
      } catch (error) {
        console.error("Avukat silinirken hata oluştu:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-[#F8F3F0] min-h-screen">
      {/* Sayfa Başlığı */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#5C4033]">Avukatlar</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#8C5C48] text-white px-4 py-2 rounded hover:bg-[#5C4033] transition"
        >
          + Avukat Ekle
        </button>
      </div>

      {/* Avukat Listesi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#EDE0D4] text-[#5C4033]">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Ad Soyad</th>
              <th className="px-4 py-2">TC Kimlik No</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">E-posta</th>
              <th className="px-4 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Yükleniyor...</td>
              </tr>
            ) : lawyers.length > 0 ? (
              lawyers.map((lawyer, index) => (
                <tr key={lawyer._id} className="hover:bg-[#FAF3F0]">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{lawyer.name} {lawyer.surname}</td>
                  <td className="px-4 py-2">{lawyer.TCNumber}</td>
                  <td className="px-4 py-2">{lawyer.phone || "Belirtilmemiş"}</td>
                  <td className="px-4 py-2">{lawyer.email || "Belirtilmemiş"}</td>
                  <td className="px-4 py-2 flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedLawyer(lawyer);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 underline"
                    >
                      Detay
                    </button>
                    <button
                      onClick={() => handleDeleteLawyer(lawyer._id)}
                      className="text-red-600 underline"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Henüz kayıtlı avukat bulunmamaktadır.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Avukat Ekle Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Yeni Avukat Ekle</h2>
            {["name", "surname", "TCNumber", "phone", "email", "address", "password"].map((field, index) => (
              <input
                key={index}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newLawyer[field]}
                onChange={(e) => setNewLawyer({ ...newLawyer, [field]: e.target.value })}
                className="w-full mb-2 border rounded px-3 py-2"
                type={field === "password" ? "password" : "text"}
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">
                İptal
              </button>
              <button onClick={handleAddLawyer} className="px-4 py-2 rounded bg-[#8C5C48] text-white hover:bg-[#5C4033] transition">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avukat Detay Modalı */}
      {showDetailsModal && selectedLawyer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Avukat Detayları</h2>
            <p><strong>Ad Soyad:</strong> {selectedLawyer.name} {selectedLawyer.surname}</p>
            <p><strong>TC Kimlik No:</strong> {selectedLawyer.TCNumber}</p>
            <p><strong>Telefon:</strong> {selectedLawyer.phone || "Belirtilmemiş"}</p>
            <p><strong>E-posta:</strong> {selectedLawyer.email || "Belirtilmemiş"}</p>
            <p><strong>Adres:</strong> {selectedLawyer.address || "Belirtilmemiş"}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerList;
