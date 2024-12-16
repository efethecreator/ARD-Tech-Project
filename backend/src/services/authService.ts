import User from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (data: {
  name: string;
  surname: string;
  TCNumber: string;
  userRole: string;
  password: string;
}) => {
  const { name, surname, TCNumber, userRole, password } = data;

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

  return await newUser.save();
};

export const loginUser = async (TCNumber: string, password: string) => {
  const user = await User.findOne({ TCNumber }).select("+authentication.password +authentication.salt");
  if (!user) throw new Error("User not found");

  const hashedPassword = crypto
    .pbkdf2Sync(password, user.authentication.salt, 1000, 64, "sha512")
    .toString("hex");

  if (hashedPassword !== user.authentication.password) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.userRole }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

