import axiosClient from "../utils/axiosClient";

const userApi = {
    getAllUsers: () => axiosClient.get("/users"),
    getAdmins: () => axiosClient.get("/users/admins"),
    getLawyers: () => axiosClient.get("/users/lawyers"),
    updateUser: (id, data) => axiosClient.put(`/users/${id}`, data),
    deleteUser: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;