import axiosClient from "../utils/axiosClient";

// Kullanıcı Girişi
export const login = async (TCNumber, password) => {
  const response = await axiosClient.post("/auth/login", { TCNumber, password });
  return response.data;
};

// Kullanıcı Kaydı
export const register = async (userData) => {
  const response = await axiosClient.post("/auth/register", userData);
  return response.data;
};
