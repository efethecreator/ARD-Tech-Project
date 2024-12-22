import axios from "axios";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // API'nizin base URL'sini buraya ekleyin
  headers: {
    "Content-Type": "application/json",
    // Diğer gerekli başlıklar eklenebilir
  },
});

export default axiosClient;
