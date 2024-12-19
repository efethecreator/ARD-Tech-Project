import { create } from "zustand";
import applicationApi from "../api/applicationApi";

export const useApplicationStore = create((set) => ({
  applications: [],
  createApplication: async (data) => {
    try {
      return await applicationApi.createApplication(data);
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },
}));

export default useApplicationStore;

