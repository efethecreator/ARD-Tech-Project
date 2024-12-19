import axiosClient from "../utils/axiosClient";

const applicationApi = {
  createApplication: (data) => axiosClient.post("/applications", data),
};

export default applicationApi;
