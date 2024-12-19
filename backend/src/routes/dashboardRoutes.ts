import { Router } from "express";
import ApplicationModel from "../models/ApplicationModel";
import UserModel from "../models/user.model";
import CaseModel from "../models/caseModel";

const router = Router();

// Dashboard verileri için endpoint
router.get("/counts", async (req, res) => {
  try {
    // Toplam başvuru sayısını al
    const applicationsCount = await ApplicationModel.countDocuments();

    // userRole: 'lawyer' olan kullanıcıları filtrele ve sayısını al
    const lawyersCount = await UserModel.countDocuments({ userRole: "lawyer" });

    // Toplam dava sayısını al
    const casesCount = await CaseModel.countDocuments();

    // JSON formatında cevap döndür
    res.json({
      applications: applicationsCount,
      lawyers: lawyersCount,
      cases: casesCount,
    });
  } catch (error) {
    console.error("Dashboard verileri alınırken hata oluştu:", error);
    res.status(500).json({ message: "Dashboard verileri alınamadı" });
  }
});

export default router;
