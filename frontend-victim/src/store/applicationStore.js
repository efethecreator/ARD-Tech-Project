import { create } from "zustand";
import applicationApi from "../api/applicationApi";

const useApplicationStore = create((set) => ({
  applications: [],

  // Tüm başvuruları getirme
  fetchApplications: async () => {
    try {
      const response = await applicationApi.getAll();
      set({ applications: response.data });
    } catch (error) {
      console.error(
        "Başvurular getirilirken hata oluştu:",
        error.response?.data || error.message
      );
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
