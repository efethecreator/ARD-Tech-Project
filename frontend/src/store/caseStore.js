import { create } from "zustand";
import caseApi from "../api/caseApi";

const useCaseStore = create((set) => ({
  cases: [],
  error: null,
  loading: false,

  // Tüm davaları getir
  fetchCases: async () => {
    set({ loading: true });
    try {
      const response = await caseApi.getAllCases();
      set({ cases: response.data, loading: false });
    } catch (err) {
      set({ error: "Davalar yüklenirken hata oluştu", loading: false });
    }
  },

  // Yeni dava ekle
 // store/caseStore.js
  createCase: async (caseData) => {
    try {
      const response = await caseApi.createCase(caseData);
      set((state) => ({ cases: [...state.cases, response.data] })); // Backend'den gelen veri eklendi
    } catch (err) {
      set({ error: "Dava eklenirken hata oluştu" });
    }
  },
  
}));

export default useCaseStore;
