// types/express.d.ts
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Veya ihtiyaca göre daha spesifik bir tip belirtebilirsiniz
    }
  }
}
