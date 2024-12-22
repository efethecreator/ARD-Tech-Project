import { create } from "zustand";
import { login } from "../api/authApi";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userId: localStorage.getItem("userId"), // Kullanıcı ID'sini yükle
  error: null,

  loginUser: async (TCNumber, password) => {
    try {
      const data = await login(TCNumber, password); // Giriş işlemi
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.userRole);
      localStorage.setItem("userId", data.userId); // Kullanıcı ID'sini kaydet
      set({
        isAuthenticated: true,
        token: data.token,
        role: data.userRole,
        userId: data.userId,
        error: null,
      });
    } catch (err) {
      set({
        isAuthenticated: false,
        token: null,
        role: null,
        userId: null, // Hata durumunda null yap
        error: err.message,
      });
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    set({
      isAuthenticated: false,
      token: null,
      role: null,
      userId: null,
      error: null,
    });
  },
}));

export default useAuthStore;
