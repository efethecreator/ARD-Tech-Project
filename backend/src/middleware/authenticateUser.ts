import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT Payload'ını özelleştiriyoruz
interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
  usertype: string;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // JWT'yi doğrula ve `decoded`'in tipini `CustomJwtPayload` olarak belirt
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

    // `decoded`'i req.user'a ekliyoruz
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
