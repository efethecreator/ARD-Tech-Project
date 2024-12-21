import express from "express";
import jwt from "jsonwebtoken";
import { getUserByTcNumber } from "../services/userService";

export const isAuthenticatedAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies["jwt"]; // Token'ı cookie'den alıyoruz

    if (!token) {
      res.status(403).json({ message: "No token provided" }); // Token eksik
      return;
    }

    if (!process.env.JWT_SECRET_KEY) {
      res.status(500).json({ message: "JWT secret is not defined" });
      return;
    }     

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      TCNumber: number;
      userRole: string;
    };

    // Kullanıcı var mı kontrol et
    const existingUser = await getUserByTcNumber(decoded.TCNumber);
    if (!existingUser || decoded.userRole !== "admin") {
      res.status(401).json({ message: "Unauthorized" }); // Kullanıcı yok veya kullanıcı tipi uygun değil
      return;
    }

    req.body.user = {
      TCNumber: decoded.TCNumber,
      userType: decoded.userRole,
    };

    next(); // Kullanıcı doğrulandı, devam et
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Geçersiz token veya başka bir hata
    return;
  }
};