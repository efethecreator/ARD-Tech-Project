import axiosClient from "../utils/axiosClient"; // axios client'ı import et

const violationApi = {
  getAllViolations: () => axiosClient.get("/violations"), // Backend'den hak ihlalleri verilerini alır
  getViolationById: (id) => axiosClient.get(`/violations/${id}`), // Tek bir hak ihlalini alır
  createViolation: (data) => axiosClient.post("/violations", data), // Yeni bir hak ihlali oluşturur
  updateViolation: (id, data) => axiosClient.put(`/violations/${id}`, data), // Hak ihlalini günceller
  deleteViolation: (id) => axiosClient.delete(`/violations/${id}`), // Hak ihlalini siler

  // Yeni eklenen dosya yükleme fonksiyonu
  uploadFile: (fileData) => {
    return axiosClient.post('/upload', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default violationApi;
