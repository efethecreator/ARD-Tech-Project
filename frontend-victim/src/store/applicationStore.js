import { create } from "zustand";
import applicationApi from "../api/applicationApi";

const useApplicationStore = create((set) => ({
  applications: [],

  // Tüm başvuruları getir
  fetchApplications: async () => {
    try {
      const response = await applicationApi.getApplications();
      set({ applications: response.data });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  },

  // Yeni başvuru oluştur
  createApplication: async (data) => {
    try {
      const response = await applicationApi.createApplication(data);
      set((state) => ({
        applications: [...state.applications, response.data],
      }));
      return response.data;
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },

  // Başvuruyu güncelle
  updateApplication: async (id, data) => {
    try {
      const response = await applicationApi.updateApplication(id, data);
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === id ? response.data : app
        ),
      }));
    } catch (error) {
      console.error("Error updating application:", error);
    }
  },

  // Başvuruyu sil
  deleteApplication: async (id) => {
    try {
      await applicationApi.deleteApplication(id);
      set((state) => ({
        applications: state.applications.filter(
          (application) => application._id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  },

  // Hak ihlali ekle
  addViolationToApplication: async (applicationId, violationData) => {
    try {
      const response = await applicationApi.addViolation(
        applicationId,
        violationData
      );
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === applicationId ? response.data : app
        ),
      }));
    } catch (error) {
      console.error("Error adding violation to application:", error);
    }
  },
}));

export default useApplicationStore;
