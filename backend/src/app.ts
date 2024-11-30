import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/auth', authRoutes);

export default app;
