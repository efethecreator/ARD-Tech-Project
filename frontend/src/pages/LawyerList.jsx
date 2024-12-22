import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { register } from "../api/authApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    TCNumber: "",
    password: "",
    userRole: "lawyer", // Varsayılan olarak "lawyer"
  });

  // Kullanıcıları Backend'den Çekme
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/users");
      console.log("Kullanıcılar:", response.data); // Log eklendi
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcıları alırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Yeni Kullanıcı Ekleme İşlemi
  const handleAddUser = async () => {
    try {
      // Modeldeki verilere uygun verileri ekliyoruz
      const response = await register({
        name: newUser.name,
        surname: newUser.surname,
        TCNumber: newUser.TCNumber,
        userRole: newUser.userRole,
        password: newUser.password, // Password eklenebilir ancak genellikle hashlenmiş olacak
      });

      console.log("Yeni Kullanıcı Eklendi:", response); // Log eklendi
      setShowAddModal(false);
      fetchUsers(); // Kullanıcıları yeniden yükle
      setNewUser({
        name: "",
        surname: "",
        TCNumber: "",
        password: "",
        userRole: "lawyer", // Varsayılan olarak avukat ekleniyor
      });
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
    }
  };

  // Kullanıcı Silme İşlemi (Onaylı)
  const handleDeleteUser = async (id) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        await axiosClient.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Kullanıcı silinirken hata oluştu:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-[#F8F3F0] min-h-screen">
      {/* Sayfa Başlığı */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#5C4033]">Kullanıcılar</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#8C5C48] text-white px-4 py-2 rounded hover:bg-[#5C4033] transition"
        >
          + Kullanıcı Ekle
        </button>
      </div>

      {/* Kullanıcı Listesi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table className="w-full text-left">
          <thead className="bg-[#EDE0D4] text-[#5C4033]">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Ad Soyad</th>
              <th className="px-4 py-2">TC Kimlik No</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Yükleniyor...</td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-[#FAF3F0]">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name} {user.surname}</td>
                  <td className="px-4 py-2">{user.TCNumber}</td>
                  <td className="px-4 py-2">{user.userRole === "admin" ? "Admin" : "Avukat"}</td>
                  <td className="px-4 py-2 flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 underline"
                    >
                      Detay
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
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
                  Henüz kullanıcı bulunmamaktadır.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Kullanıcı Ekleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Yeni Kullanıcı Ekle</h2>

            {/* Kullanıcı Rolü Seçimi */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Kullanıcı Rolü</label>
              <select
                value={newUser.userRole}
                onChange={(e) => setNewUser({ ...newUser, userRole: e.target.value })}
                className="w-full mb-2 border rounded px-3 py-2"
              >
                <option value="lawyer">Avukat</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Kullanıcı Bilgileri Formu */}
            {["name", "surname", "TCNumber", "password"].map((field, index) => (
              <input
                key={index}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newUser[field]}
                onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                className="w-full mb-2 border rounded px-3 py-2"
                type={field === "password" ? "password" : "text"}
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition">
                İptal
              </button>
              <button onClick={handleAddUser} className="px-4 py-2 rounded bg-[#8C5C48] text-white hover:bg-[#5C4033] transition">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kullanıcı Detay Modalı */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Kullanıcı Detayları</h2>
            <p><strong>Ad Soyad:</strong> {selectedUser.name} {selectedUser.surname}</p>
            <p><strong>TC Kimlik No:</strong> {selectedUser.TCNumber}</p>
            <p><strong>Kullanıcı Rolü:</strong> {selectedUser.userRole === "admin" ? "Admin" : "Avukat"}</p>
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

export default UserList;
