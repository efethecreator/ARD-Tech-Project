import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend'inizin temel URL'si
});

export default axiosClient;
