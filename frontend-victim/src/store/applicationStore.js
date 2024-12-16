import { create } from "zustand";
import axios from "axios";



export const useApplicationStore = create((set) => ({
  applications: [],
  fetchApplications: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/applications");
      const data = response.data; // Gelen veriyi kontrol et
      console.log("Applications Data:", data); // Gelen veriyi konsola yazdır
      set({ applications: Array.isArray(data) ? data : [] }); // Dizi değilse boş bir dizi olarak ayarla
    } catch (error) {
      console.error("Failed to fetch applications", error);
      set({ applications: [] }); // Hata durumunda boş bir dizi olarak ayarla
    }
  },  
 createApplication : async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/applications`, data);
    console.log("Application created successfully:", response.data);
  } catch (error) {
    console.error("Failed to create application", error.response?.data || error.message);
  }
},

  deleteApplication: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      set((state) => ({
        applications: state.applications.filter((app) => app._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  },
}));
