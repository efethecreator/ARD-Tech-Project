import express, { Application } from 'express';
import { PORT } from './config/config'; // PORT'u config.ts'ten alıyoruz
import { connectDB } from './db/database'; // connectDB fonksiyonunu import ediyoruz
import userRoutes from './routes/userRoutes'; // Kullanıcı işlemleri rotalarını import ediyoruz
import authRoutes from './routes/auth.route'; // Auth rotalarını import ediyoruz
import ApplicationRoutes from './routes/ApplicationRoutes'; // Başvuru işlemleri rotalarını import ediyoruz
import cookieParser from 'cookie-parser'; // Cookie parsing için
import cors from 'cors'; // CORS middleware
import caseRoutes from './routes/caseRoutes';
import violationRoutes from './routes/violationRoute';
import dashboardRoutes from "./routes/dashboardRoutes";
import dotenv from 'dotenv';

dotenv.config();


const app: Application = express(); // Express uygulamasını başlatıyoruz

// Veritabanı bağlantısını başlatıyoruz
connectDB();

// Middleware: JSON verisi işlemesi için
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: [process.env.FRONT_END_URL || "" , process.env.VICTIM_FRONT_END_URL || ""], 
  credentials: true
}));
// Cookie parsing middleware
app.use(cookieParser()); // cookie-parser middleware
// Auth rotalarını /api/auth endpointine bağlıyoruz
app.use('/api/auth', authRoutes);


// Başvuru işlemleri rotalarını /api/applications endpointine bağlıyoruz
app.use('/api/applications', ApplicationRoutes);



// Kullanıcı işlemleri rotalarını /api/users endpointine bağlıyoruz
app.use('/api/users', userRoutes);

app.use('/api/cases', caseRoutes);

app.use('/api/violations', violationRoutes);




// Global bir hata yakalama middleware'i (isteğe bağlı)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server ${PORT} üzerinde çalışıyor.`);
});

app.use("/api/dashboard", dashboardRoutes);
