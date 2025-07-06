import express from "express";
import jwt from "jsonwebtoken";
import { getUserByTcNumber } from "../services/userService";

export const isAuthenticatedLawyer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies["jwtToken"]; 

    if (!token) {
      return res.status(403).json({ message: "No token provided" }); 
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "JWT secret is not defined" }); 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      TCNumber: number;
      userRole: string;
    };

    const existingUser = await getUserByTcNumber(decoded.TCNumber);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.userRole !== "lawyer" && existingUser.userRole !== "admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = {
      userId: existingUser._id,
      userRole: existingUser.userRole,
      TCNumber: existingUser.TCNumber,
    };

    next(); 
  } catch (error) {
    console.error("Error in token verification:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};
