import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import ApplicationService from "../services/ApplicationService";
import { uploadFileS3 } from "../services/aws3service"; 

class ApplicationController {
  createApplication: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const formData = req.body;
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "File is required" });
        return;
      }

      const fileKey = `citizen-applications/${uuidv4()}-${file.originalname}`;

      const { fileKey: uploadedFileKey } = await uploadFileS3(fileKey, file);

      formData.files = {
        fileKey: uploadedFileKey,
        description: "File uploaded for application",
      };

      const savedApplication = await ApplicationService.createApplication(
        formData
      );
      res.status(201).json({
        message: "Application created successfully",
        data: savedApplication,
      });
    } catch (error: any) {
      console.error("Error creating application:", error);
      res.status(500).json({ message: error.message });
    }
  };

  getApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplications();
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getApplicationById: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const application = await ApplicationService.getApplicationById(
        req.params.id
      );
      if (!application) {
        res.status(404).json({ message: "Application not found" });
        return;
      }
      res.status(200).json(application);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateApplication: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const application = await ApplicationService.updateApplication(
        req.params.id,
        req.body
      );
      if (!application) {
        res.status(404).json({ message: "Application not found" });
        return;
      }
      res.status(200).json(application);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteApplication: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const application = await ApplicationService.deleteApplication(
        req.params.id
      );
      if (!application) {
        res.status(404).json({ message: "Application not found" });
        return;
      }
      res.status(200).json({ message: "Application deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getPendingApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplicationsByStatus(
        "pending"
      );
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getApprovedApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplicationsByStatus(
        "approved"
      );
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getRejectedApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplicationsByStatus(
        "rejected"
      );
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getPersonalApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplicationsByType(
        "personal"
      );
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getCorporateApplications: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const applications = await ApplicationService.getApplicationsByType(
        "corporate"
      );
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  addViolation: RequestHandler = async (req: Request, res: Response) => {
    try {
      const applicationId = req.params.id;
      const { violationId } = req.body;

      const updatedApplication = await ApplicationService.addViolation(
        applicationId,
        violationId
      );

      if (!updatedApplication) {
        res.status(404).json({ message: "Application or Violation not found" });
        return;
      }

      res.status(200).json({
        message: "Violation added successfully",
        data: updatedApplication,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  addLawyer: RequestHandler = async (req: Request, res: Response) => {
    try {
      const applicationId = req.params.id;
      const { lawyerId } = req.body;

      const updatedApplication = await ApplicationService.addLawyer(
        applicationId,
        lawyerId
      );

      if (!updatedApplication) {
        res.status(404).json({ message: "Application or Lawyer not found" });
        return;
      }

      res.status(200).json({
        message: "Lawyer added successfully",
        data: updatedApplication,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ApplicationController();
