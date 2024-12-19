import { create } from "zustand";
import applicationApi from "../api/applicationApi";

const useApplicationStore = create((set) => ({
  applications: [],
  fetchApplications: async () => {
    try {
      const response = await applicationApi.getAll();
      set({ applications: response.data });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  },
  createApplication: async (data) => {
    try {
      console.log("Application data:", data);
      return await applicationApi.createApplication(data);
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },
  deleteApplication: async (id) => {
    try {
      await applicationApi.delete(id);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  },
}));

export default useApplicationStore;