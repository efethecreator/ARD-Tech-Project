import axiosClient from "../utils/axiosClient";

const applicationApi = {
  getAll: () => axiosClient.get("/applications"),
  getById: (id) => axiosClient.get(`/applications/${id}`),
  create: (data) => axiosClient.post("/applications", data),
  update: (id, data) => axiosClient.put(`/applications/${id}`, data),
  delete: (id) => axiosClient.delete(`/applications/${id}`),
};

export default applicationApi;
