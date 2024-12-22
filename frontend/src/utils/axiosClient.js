import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true, // Eğer kimlik doğrulama gerektiriyorsa
});

export default axiosClient;
