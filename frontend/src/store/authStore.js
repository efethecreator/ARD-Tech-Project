import { create } from "zustand";
import axiosClient from "../utils/axiosClient";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userId: localStorage.getItem("userId"),
  name: "",
  surname: "",
  error: null,

  loginUser: async (TCNumber, password) => {
    try {
      const { data } = await axiosClient.post("/auth/login", {
        TCNumber,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.userRole);
      localStorage.setItem("userId", data.userId);
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
        userId: null,
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
      name: "",
      surname: "",
      error: null,
    });
  },
}));

export default useAuthStore;
