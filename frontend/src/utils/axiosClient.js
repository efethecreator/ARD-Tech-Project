import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL, doğru şekilde ayarlanmalı
  withCredentials: true, // Eğer kimlik doğrulama gerektiriyorsa
});

export default axiosClient;
