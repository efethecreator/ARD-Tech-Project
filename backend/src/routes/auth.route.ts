// router/authRoute.js
import { Router } from "express";
import { createUser, login, logout } from "../controllers/authController";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout); 

export default router;
