import { Request, Response } from "express";
import CaseService from "../services/caseService";

export default class CaseController {
  static async createCase(req: Request, res: Response) {
    try {
      const caseData = req.body;
      const newCase = await CaseService.createCase(caseData);
      res.status(201).json(newCase);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error creating case", error });
      return;
    }
  }

  static async getAllCases(req: Request, res: Response) {
    try {
      const cases = await CaseService.getAllCases();
      res.status(200).json(cases);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching cases", error });
      return;
    }
  }

  static async getCaseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const caseData = await CaseService.getCaseById(id);
      if (!caseData) {
        res.status(404).json({ message: "Case not found" });
        return;
      }
      res.status(200).json(caseData);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching case", error });
      return;
    }
  }

  static async updateCase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCase = await CaseService.updateCase(id, updates);
      if (!updatedCase) {
        res.status(404).json({ message: "Case not found" });
        return;
      }
      res.status(200).json(updatedCase);
      return;
    } catch (error) {
      res.status(500).json({ message: "Error updating case", error });
      return;
    }
  }

  static async deleteCase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedCase = await CaseService.deleteCase(id);
      if (!deletedCase) {
        res.status(404).json({ message: "Case not found" });
        return;
      }
      res.status(200).json({ message: "Case deleted successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting case", error });
      return;
    }
  }
}
