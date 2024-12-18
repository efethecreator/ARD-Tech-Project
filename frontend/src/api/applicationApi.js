import axiosClient from "../utils/axiosClient";

const applicationApi = {
  getAll: () => axiosClient.get("/applications"),
  getById: (id) => axiosClient.get(`/applications/${id}`),
  createApplication: (data) => axiosClient.post("/applications", data),
  createViolation: (data) => axiosClient.post("/violations", data),
  update: (id, data) => axiosClient.put(`/applications/${id}`, data),
  delete: (id) => axiosClient.delete(`/applications/${id}`),
  addViolation: (applicationId, data) =>
    axiosClient.put(`/applications/${applicationId}/violation`, data),
};

export default applicationApi;
