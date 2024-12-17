import { create } from "zustand";
import violationApi from "../api/violationApi";

const useViolationStore = create((set) => ({
  violations: [],
  loading: false,
  error: null, // Track errors

  // Fetch violations
  fetchViolations: async () => {
    set({ loading: true, error: null }); // Reset loading and error state
    try {
      const response = await violationApi.getAllViolations();
      set({ violations: response.data });
    } catch (error) {
      console.error("Error fetching violations:", error);
      set({ error: "Error fetching violations" }); // Set error state
    } finally {
      set({ loading: false });
    }
  },

  // Add a violation
  addViolation: async (data) => {
    set({ loading: true, error: null }); // Reset loading and error state
    try {
      await violationApi.createViolation(data);
      // Once added successfully, fetch violations again
      await useViolationStore.getState().fetchViolations();
    } catch (error) {
      console.error("Error adding violation:", error);
      set({ error: "Error adding violation" }); // Set error state
    } finally {
      set({ loading: false });
    }
  },
}));

export default useViolationStore;
