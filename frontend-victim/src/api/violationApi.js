import axiosClient from "../utils/axiosClient";

const violationApi = {
  // Tüm hak ihlallerini getir
  getAllViolations: () => axiosClient.get("/violations"),

  // Tek bir hak ihlalini getir
  getViolationById: (id) => axiosClient.get(`/violations/${id}`),

  // Hak ihlali oluştur
  createViolation: (data) => axiosClient.post("/violations", data),

  // Hak ihlalini güncelle
  updateViolation: (id, data) => axiosClient.put(`/violations/${id}`, data),

  // Hak ihlalini sil
  deleteViolation: (id) => axiosClient.delete(`/violations/${id}`),
};

export default violationApi;
