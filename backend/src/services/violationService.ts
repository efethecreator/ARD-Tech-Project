import violationModel, { IViolation } from "../models/violationModel";

export default class ViolationService {
    static async createViolation(violationData: IViolation) {
        const newViolation = await violationModel.create(violationData);
        return newViolation;
    }

    static async getViolations() {
        const violations = await violationModel.find();
        return violations;
    }

    static async getViolationById(violationId: string) {
        const violation = await violationModel.findById(violationId);
        return violation;
    }

    static async updateViolation(violationId: string, updates: Partial<IViolation>) {
        const updatedViolation = await violationModel.findByIdAndUpdate(violationId, updates, { new: true });
        return updatedViolation;
    }

    static async deleteViolation(violationId: string) {
        const deletedViolation = await violationModel.findByIdAndDelete(violationId);
        return deletedViolation;
    }

}