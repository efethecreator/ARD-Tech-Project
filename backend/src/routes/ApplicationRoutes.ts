import { Router } from "express";
import ApplicationController from "../controllers/ApplicationController";
import multer from "../middleware/aws3middleware";

const router = Router();


// CRUD Operations
router.post("/", multer.single("file"), ApplicationController.createApplication);
router.get("/", ApplicationController.getApplications);
router.get("/:id", ApplicationController.getApplicationById);
router.put("/:id", ApplicationController.updateApplication);
router.delete("/:id", ApplicationController.deleteApplication);

// Additional filters
router.get("/status/pending", ApplicationController.getPendingApplications);
router.get("/status/approved", ApplicationController.getApprovedApplications);
router.get("/status/rejected", ApplicationController.getRejectedApplications);
router.get("/type/personal", ApplicationController.getPersonalApplications);
router.get("/type/corporate", ApplicationController.getCorporateApplications);
router.put("/:id/violation", ApplicationController.addViolation);
router.put("/:id/lawyer", ApplicationController.addLawyer);

export default router;
