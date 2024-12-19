import axiosClient from "../utils/axiosClient";

const applicationApi = {
  createApplication: (data) => {
    return axiosClient.post("/applications", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Bu başlık manuel olarak eklenmeli
      },
    });
  },
  createViolation: (data) => axiosClient.post("/violations", data),
};

export default applicationApi;
