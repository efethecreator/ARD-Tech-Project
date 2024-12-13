import CaseModel, { ICase } from '../models/caseModel';

export default class CaseService {
    static async createCase(caseData: Partial<ICase>): Promise<ICase> {
        const newCase = new CaseModel(caseData);
        return await newCase.save();
    }

    static async getAllCases(): Promise<ICase[]> {
        return await CaseModel.find().exec();
    }

    static async getCaseById(caseId: string): Promise<ICase | null> {
        return await CaseModel.findById(caseId).exec();
    }

    static async updateCase(caseId: string, updates: Partial<ICase>): Promise<ICase | null> {
        return await CaseModel.findByIdAndUpdate(caseId, updates, { new: true }).exec();
    }

    static async deleteCase(caseId: string): Promise<ICase | null> {
        return await CaseModel.findByIdAndDelete(caseId).exec();
    }
}
