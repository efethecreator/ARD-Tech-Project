import express from "express";
import jwt from "jsonwebtoken";
import { getUserByTcNumber } from "../services/userService";

export const isAuthenticatedLawyer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies["jwtToken"]; // Token'ı cookie'den alıyoruz

    if (!token) {
      return res.status(403).json({ message: "No token provided" }); // Token eksik
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "JWT secret is not defined" }); // Sunucu yapılandırma hatası
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      TCNumber: number;
      userRole: string;
    };

    // Kullanıcı veritabanında var mı kontrol et
    const existingUser = await getUserByTcNumber(decoded.TCNumber);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" }); // Kullanıcı yok
    }

    // Kullanıcı rolü kontrolü
    if (existingUser.userRole !== "lawyer" && existingUser.userRole !== "admin") {
      return res.status(401).json({ message: "Unauthorized access" }); // Yetkisiz erişim
    }

    // Kullanıcıyı req.body.user yerine req.user'a ekle
    req.user = {
      userId: existingUser._id,
      userRole: existingUser.userRole,
      TCNumber: existingUser.TCNumber,
    };

    next(); // Kullanıcı doğrulandı, bir sonraki middleware'e devam et
  } catch (error) {
    console.error("Error in token verification:", error);
    return res.status(400).json({ message: "Invalid token" }); // Geçersiz token veya başka bir hata
  }
};
