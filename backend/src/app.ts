import express, { Application } from 'express';
import { PORT } from './config/config'; // PORT'u config.ts'ten alıyoruz
import { connectDB } from './db/database'; // connectDB fonksiyonunu import ediyoruz
import userRoutes from './routes/userRoutes'; // Kullanıcı işlemleri rotalarını import ediyoruz
import authRoutes from './routes/auth.route'; // Auth rotalarını import ediyoruz
import ApplicationRoutes from './routes/ApplicationRoutes'; // Başvuru işlemleri rotalarını import ediyoruz
import cookieParser from 'cookie-parser'; // Cookie parsing için
import cors from 'cors'; // CORS middleware

const app: Application = express(); // Express uygulamasını başlatıyoruz

// Veritabanı bağlantısını başlatıyoruz
connectDB();

// Middleware: JSON verisi işlemesi için
app.use(express.json());

// CORS middleware
app.use(cors()); // CORS middleware

// Cookie parsing middleware
app.use(cookieParser()); // cookie-parser middleware

// Başvuru işlemleri rotalarını /api/applications endpointine bağlıyoruz
app.use('/api/applications', ApplicationRoutes);

// Auth rotalarını /api/auth endpointine bağlıyoruz
app.use('/api/auth', authRoutes);

// Kullanıcı işlemleri rotalarını /api/users endpointine bağlıyoruz
app.use('/api/users', userRoutes);




// Global bir hata yakalama middleware'i (isteğe bağlı)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server ${PORT} üzerinde çalışıyor.`);
});
