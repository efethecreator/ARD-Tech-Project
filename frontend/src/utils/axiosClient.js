import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true, // Kimlik bilgileri için
});

// Dosya yükleme sırasında Content-Type ayarını kaldırın!
export default axiosClient;
