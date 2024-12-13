import { Router } from "express";
import {
  getUsers,
  getAdmins,
  getLawyers,
  updateUser,
  deleteUser,
} from "../controllers/usersController";

const router = Router();

router.get("/", getUsers);
router.get("/admins", getAdmins);
router.get("/lawyers", getLawyers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
