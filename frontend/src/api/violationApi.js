import axiosClient from "../utils/axiosClient";

const violationApi = {
  getAllViolations: () => axiosClient.get("/violations"), // Tüm ihlalleri getirir
  getViolationById: (id) => axiosClient.get(`/violations/${id}`), // Tek bir ihlal getirir
  createViolation: (data) => axiosClient.post("/violations", data), // Yeni ihlal oluşturur
  updateViolation: (id, data) => axiosClient.put(`/violations/${id}`, data), // İhlali günceller
  deleteViolation: (id) => axiosClient.delete(`/violations/${id}`), // İhlali siler
};

export default violationApi;
