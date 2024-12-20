import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // API'nizin base URL'sini buraya ekleyin
  headers: {
    'Content-Type': 'application/json',
    // Diğer gerekli başlıklar eklenebilir
  },
});

export default axiosClient;
  