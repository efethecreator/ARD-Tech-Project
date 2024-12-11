import { Router } from "express";
import {
  getUsers,
  getAdmins,
  updateUser,
  deleteUser,
} from "../controllers/usersController";

const router = Router();

router.get("/", getUsers);
router.get("/admins", getAdmins);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
