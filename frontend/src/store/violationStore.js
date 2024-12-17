import { create } from "zustand";
import violationApi from "../api/violationApi";

const useViolationStore = create((set) => ({
  violations: [],
  loading: false,
  fetchViolations: async () => {
    set({ loading: true });
    try {
      const response = await violationApi.getAllViolations();
      set({ violations: response.data });
    } catch (error) {
      console.error("Hak ihlalleri yüklenirken hata:", error);
    } finally {
      set({ loading: false });
    }
  },
  addViolation: async (data) => {
    try {
      await violationApi.createViolation(data);
      await useViolationStore.getState().fetchViolations();
    } catch (error) {
      console.error("Hak ihlali eklenirken hata:", error);
    }
  },
}));

export default useViolationStore;
