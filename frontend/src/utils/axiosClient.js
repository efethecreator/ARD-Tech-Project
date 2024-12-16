import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // CORS sırasında kimlik bilgilerini göndermek için
});

export default axiosClient;
