import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Hatası:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
