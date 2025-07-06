import { Router } from "express";
import ApplicationModel from "../models/ApplicationModel";
import UserModel from "../models/user.model";
import CaseModel from "../models/caseModel";

const router = Router();

router.get("/counts", async (req, res) => {
  try {
    const applicationsCount = await ApplicationModel.countDocuments();

    const usersCount = await UserModel.countDocuments({
      userRole: { $in: ["admin", "lawyer"] }
    })

    const casesCount = await CaseModel.countDocuments();

    res.json({
      applications: applicationsCount,
      users: usersCount,
      cases: casesCount,
    });
  } catch (error) {
    console.error("Dashboard verileri alınırken hata oluştu:", error);
    res.status(500).json({ message: "Dashboard verileri alınamadı" });
  }
});

export default router;
