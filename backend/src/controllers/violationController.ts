import { Request, Response, RequestHandler } from "express";
import violationModel from "../models/violationModel";
import { get } from "mongoose";
import { uploadFileS3 } from "../services/aws3service"; // Assuming this is the path to your S3 upload function
import { v4 as uuidv4 } from "uuid";

export default class ViolationController {
  static createViolation: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const violationData = req.body;
      const file = req.file; // Dosya alındı
      if (!file) {
        res.status(400).json({ message: "File is required" });
        return;
      }

      if (file) {
        // Dosya yüklenmeden önce benzersiz bir dosya anahtarı oluşturuluyor
        const fileKey = `violations/${uuidv4()}-${file.originalname}`;

        // Dosyayı S3'ye yükleyip geri dönen anahtarı alıyoruz
        const { fileKey: uploadedFileKey } = await uploadFileS3(fileKey, file);

        // Dosya bilgisini violationData'ya ekliyoruz
        violationData.files = {
          fileKey: uploadedFileKey,
          description: "File uploaded for violation",
        };
      }

      // Violation kaydını veritabanına ekliyoruz
      const newViolation = await violationModel.create(violationData);

      // Başarı durumunda yanıt gönderiyoruz
      res.status(201).json(newViolation);
    } catch (error: any) {
      console.error("Error creating violation:", error);
      res
        .status(500)
        .json({ message: "Error creating violation", error: error.message });
    }
  };

  static async getViolations(req: Request, res: Response) {
    try {
      const violations = await violationModel.find();
      res.status(200).json(violations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching violations", error });
    }
  }

  static async getViolationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const violation = await violationModel.findById(id);
      if (!violation) {
        res.status(404).json({ message: "Violation not found" });
        return;
      }
      res.status(200).json(violation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching violation", error });
    }
  }

  static async updateViolation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedViolation = await violationModel.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      if (!updatedViolation) {
        res.status(404).json({ message: "Violation not found" });
        return;
      }
      res.status(200).json(updatedViolation);
    } catch (error) {
      res.status(500).json({ message: "Error updating violation", error });
    }
  }

  static async deleteViolation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedViolation = await violationModel.findByIdAndDelete(id);
      if (!deletedViolation) {
        res.status(404).json({ message: "Violation not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Violation deleted successfully", deletedViolation });
    } catch (error) {
      res.status(500).json({ message: "Error deleting violation", error });
    }
  }
}
