import axiosClient from "../utils/axiosClient";

const applicationApi = {
  getAll: () => axiosClient.get("/applications"),
  getById: (id) => axiosClient.get(`/applications/${id}`),
  create: (data) => axiosClient.post("/applications", data),
  update: (id, data) => axiosClient.put(`/applications/${id}`, data),
  delete: (id) => axiosClient.delete(`/applications/${id}`),
  getPendingApplications: () => axiosClient.get("/applications/pending"),
  getApprovedApplications: () => axiosClient.get("/applications/approved"),
  getRejectedApplications: () => axiosClient.get("/applications/rejected"),
  getPersonalApplications: () => axiosClient.get("/applications/personal"),
  getCorporateApplications: () => axiosClient.get("/applications/corporate"),
  addViolation: (id, data) => axiosClient.put(`/applications/${id}/violation`, data),
};

export default applicationApi;
