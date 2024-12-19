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

  // Yeni başvuru oluşturma
  createApplication: async (data) => {
    try {
      const response = await applicationApi.createApplication(data);
      console.log("Başvuru başarıyla oluşturuldu:", response.data);
      set((state) => ({
        applications: [...state.applications, response.data],
      }));
      return response.data;
    } catch (error) {
      console.error(
        "Başvuru oluşturulurken hata oluştu:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Başvuru oluşturulurken hata oluştu."
      );
    }
  },
  
}));

export default useApplicationStore;
