import { Request, Response } from "express";
import User from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, TCNumber, userRole, password } = req.body;

    if (!TCNumber || TCNumber.trim() === "") {
      res.status(400).json({ message: "TCNumber is required" });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const newUser = new User({
      name,
      surname,
      TCNumber,
      userRole,
      authentication: {
        password: hashedPassword,
        salt,
      },
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error: unknown) {
    // Hata türü ve mesajını güvenli bir şekilde ele alma
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000 &&
      (error as any).keyPattern?.TCNumber
    ) {
      res.status(400).json({
        message: "User with this TCNumber already exists",
        error: (error as any).message,
      });
      return;
    }

    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { TCNumber, password } = req.body;

    // Kullanıcıyı TCNumber ile bul ve authentication alanlarını seç
    const user = await User.findOne({ TCNumber }).select(
      "+authentication.password +authentication.salt"
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Şifreyi doğrula
    const hashedPassword = crypto
      .pbkdf2Sync(password, user.authentication.salt, 1000, 64, "sha512")
      .toString("hex");

    if (hashedPassword !== user.authentication.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // JWT token oluştur
    const token = jwt.sign({ id: user._id, role: user.userRole }, JWT_SECRET, {
      expiresIn: "1d",
    });
    // Cookie'ye token yaz
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token, userRole: user.userRole });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
  
};

export const logout = (req: Request, res: Response) => {
  // Clear the authentication cookie
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "Logged out successfully" });
};
