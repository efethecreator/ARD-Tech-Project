import axiosClient from "../utils/axiosClient";

const caseApi = {
  // Tüm davaları getir
  getAllCases: () => axiosClient.get("/cases"),

  // Yeni dava ekle
  createCase: (caseData) => axiosClient.post("/cases", caseData),

  // Belirli bir davayı getir
  getCaseById: (id) => axiosClient.get(`/cases/${id}`),

  // Davayı güncelle
  updateCase: (id, updatedData) => axiosClient.put(`/cases/${id}`, updatedData),

  // Davayı sil
  deleteCase: (id) => axiosClient.delete(`/cases/${id}`),
};

export default caseApi;
