import express from 'express';
import { PORT } from './config/config'; // PORT'u config.ts'ten alıyoruz
import { connectDB } from './db/database'; // connectDB fonksiyonunu import ediyoruz

const app = express();

// Veritabanı bağlantısını başlatıyoruz
connectDB();

// Middleware: JSON verisi işlemesi için
app.use(express.json());

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
    console.log(`Server ${PORT} üzerinde çalışıyor.`);
});
