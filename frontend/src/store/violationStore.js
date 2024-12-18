import { create } from "zustand";
import violationApi from "../api/violationApi";

const useViolationStore = create((set) => ({
  violations: [],
  fetchViolations: async () => {
    try {
      const response = await violationApi.getAllViolations();
      set({ violations: response.data });
    } catch (error) {
      console.error("Error fetching violations:", error);
    }
  },
  addViolation: async (data) => {
    try {
      const response = await violationApi.createViolation(data);
      return response;
    } catch (error) {
      console.error("Error adding violation:", error);
      throw error;
    }
  },
}));

export default useViolationStore;
