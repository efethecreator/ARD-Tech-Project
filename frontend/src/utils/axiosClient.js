import axios from "axios";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;

const axiosClient = axios.create({
  baseURL: BACK_END_URL, // Backend URL
  withCredentials: true, // Eğer kimlik doğrulama gerektiriyorsa
});

export default axiosClient;
