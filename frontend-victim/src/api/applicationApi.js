import axiosClient from './axiosClient';

const applicationApi = {
  create: (data) => axiosClient.post('/applications', data), // Backend'e veri gönderiliyor
  getAll: () => axiosClient.get('/applications'),
  update: (id, data) => axiosClient.put(`/applications/${id}`, data),
  delete: (id) => axiosClient.delete(`/applications/${id}`),
};

export default applicationApi;
