import axiosClient from "../utils/axiosClient";

const applicationApi = {
  // Yeni başvuru oluşturma
  createApplication: (data) =>
    axiosClient.post("/applications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Hak ihlali oluşturma
  createViolation: (data) => axiosClient.post("/violations", data),

  // Mevcut tüm başvuruları getir
  getApplications: () => axiosClient.get("/applications"),

  // Tek bir başvuruyu getir
  getApplicationById: (id) => axiosClient.get(`/applications/${id}`),

  // Başvuruyu güncelle
  updateApplication: (id, data) => axiosClient.put(`/applications/${id}`, data),

  // Başvuruyu sil
  deleteApplication: (id) => axiosClient.delete(`/applications/${id}`),

  // Başvuruya violation ekleme
  addViolation: (applicationId, data) =>
    axiosClient.put(`/applications/${applicationId}/violation`, data),
};

export default applicationApi;
