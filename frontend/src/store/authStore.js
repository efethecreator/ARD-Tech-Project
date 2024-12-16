import { create } from "zustand";
import { login } from "../api/authApi";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  error: null,

  loginUser: async (TCNumber, password) => {
    try {
      const data = await login(TCNumber, password);
      localStorage.setItem("token", data.token); // Token'ı localStorage'a kaydet
      set({ isAuthenticated: true, token: data.token, error: null });
    } catch (err) {
      set({ isAuthenticated: false, error: err.message });
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, token: null, error: null });
  },
}));

export default useAuthStore;
