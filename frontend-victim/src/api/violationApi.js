import axiosClient from "../utils/axiosClient";

const violationApi = {
  // Tüm hak ihlallerini getir
  getViolations: () => axiosClient.get("/violations"),

  // Tek bir hak ihlalini getir
  getViolationById: (id) => axiosClient.get(`/violations/${id}`),

  // Hak ihlali oluştur
  createViolation: async (data) => {
    try {
      const violationResponse = await axiosClient.post("/violations", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Buradaki Content-Type, axios tarafından otomatik ayarlanabilir.
        },
      });
      return violationResponse; // Başarılı yanıtı döndür
    } catch (error) {
      console.error("Error creating violation:", error); // Hata durumunu logla
      throw error; // Hata fırlat
    }
  },

  // Hak ihlalini güncelle
  updateViolation: (id, data) => axiosClient.put(`/violations/${id}`, data),

  // Hak ihlalini sil
  deleteViolation: (id) => axiosClient.delete(`/violations/${id}`),
};

export default violationApi;
