import { create } from "zustand";
import violationApi from "../api/violationApi";

const useViolationStore = create((set) => ({
  violations: [],

  // Tüm hak ihlallerini getir
  fetchViolations: async () => {
    try {
      const response = await violationApi.getAllViolations();
      set({ violations: response.data });
    } catch (error) {
      console.error("Error fetching violations:", error);
    }
  },

  // Yeni hak ihlali oluştur
  createViolation: async (data) => {
    try {
      const response = await violationApi.createViolation(data);
      console.log(response.data); // Burada gelen veriyi kontrol edin
      set((state) => ({
        violations: [...state.violations, response.data],
      }));
      return response.data;
    } catch (error) {
      console.error("Error creating violation:", error);
      throw error;
    }
  },
  

  // Hak ihlalini güncelle
  updateViolation: async (id, data) => {
    try {
      const response = await violationApi.updateViolation(id, data);
      set((state) => ({
        violations: state.violations.map((violation) =>
          violation._id === id ? response.data : violation
        ),
      }));
    } catch (error) {
      console.error("Error updating violation:", error);
    }
  },

  // Hak ihlalini sil
  deleteViolation: async (id) => {
    try {
      await violationApi.deleteViolation(id);
      set((state) => ({
        violations: state.violations.filter((violation) => violation._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting violation:", error);
    }
  },
}));

export default useViolationStore;
