import create from "zustand";
import userApi from "../api/userApi"; // Kullanıcıları almak için API

const useUserStore = create((set) => ({
  users: [], // Kullanıcılar için state
  loading: false, // Yükleniyor durumu
  error: null, // Hata durumu

  // Kullanıcıları yüklemek için
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await userApi.getAllUsers(); // Tüm kullanıcıları al
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ error: "Kullanıcılar alınırken bir hata oluştu." });
    } finally {
      set({ loading: false });
    }
  },

  // Avukatları yüklemek için
  fetchLawyers: async () => {
    set({ loading: true });
    try {
      const response = await userApi.getLawyers(); // Avukatları al
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      set({ error: "Avukatlar alınırken bir hata oluştu." });
    } finally {
      set({ loading: false });
    }
  },

  // Admin kullanıcılarını yüklemek için
  fetchAdmins: async () => {
    set({ loading: true });
    try {
      const response = await userApi.getAdmins(); // Adminleri al
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching admins:", error);
      set({ error: "Adminler alınırken bir hata oluştu." });
    } finally {
      set({ loading: false });
    }
  },

  // Kullanıcıyı güncellemek için
  updateUser: async (id, updatedData) => {
    set({ loading: true });
    try {
      const response = await userApi.updateUser(id, updatedData);
      const updatedUsers = set((state) =>
        state.users.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      );
      set({ users: updatedUsers });
    } catch (error) {
      console.error("Error updating user:", error);
      set({ error: "Kullanıcı güncellenirken bir hata oluştu." });
    } finally {
      set({ loading: false });
    }
  },

  // Kullanıcıyı silmek için
  deleteUser: async (id) => {
    set({ loading: true });
    try {
      await userApi.deleteUser(id); // Kullanıcıyı sil
      const updatedUsers = set((state) =>
        state.users.filter((user) => user.id !== id)
      );
      set({ users: updatedUsers });
    } catch (error) {
      console.error("Error deleting user:", error);
      set({ error: "Kullanıcı silinirken bir hata oluştu." });
    } finally {
      set({ loading: false });
    }
  },

}));

export default useUserStore;
