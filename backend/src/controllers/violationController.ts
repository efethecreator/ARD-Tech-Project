import { Request, Response } from "express";
import violationModel from "../models/violationModel";
import { get } from "mongoose";

export default class ViolationController {
  static async createViolation(req: Request, res: Response) {
    try {
      const violationData = req.body;
      const newViolation = await violationModel.create(violationData);
      res.status(201).json(newViolation);
    } catch (error) {
      res.status(500).json({ message: "Error creating violation", error });
    }
  }

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
