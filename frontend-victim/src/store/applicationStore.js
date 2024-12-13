import create from 'zustand';

const useApplicationStore = create((set) => ({
  applications: [],
  setApplications: (apps) => set({ applications: apps }),
  addApplication: (app) =>
    set((state) => ({ applications: [...state.applications, app] })), // Yeni başvuru ekleme
  updateApplication: (updatedApp) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === updatedApp.id ? updatedApp : app
      ),
    })),
  removeApplication: (id) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    })),
}));

export default useApplicationStore;
