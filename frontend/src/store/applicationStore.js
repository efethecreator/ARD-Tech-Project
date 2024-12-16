import { create } from "zustand";
import applicationApi from "../api/applicationApi";

const useApplicationStore = create((set) => ({
  applications: [],
  fetchApplications: async () => {
    const response = await applicationApi.getAll();
    set({ applications: response.data });
  },
  createApplication: async (data) => {
    await applicationApi.create(data);
  },
  deleteApplication: async (id) => {
    await applicationApi.delete(id);
  },
}));

export default useApplicationStore;
