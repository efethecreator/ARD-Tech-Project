import ApplicationModel, { IApplication } from "../models/ApplicationModel";

class ApplicationService {
  async createApplication(data: Partial<IApplication>): Promise<IApplication> {
    const application = new ApplicationModel(data);
    return await application.save();
  }

  async getApplications(): Promise<IApplication[]> {
    return await ApplicationModel.find();
  }

  async getApplicationById(id: string): Promise<IApplication | null> {
    return await ApplicationModel.findById(id);
  }

  async updateApplication(id: string, data: Partial<IApplication>): Promise<IApplication | null> {
    return await ApplicationModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteApplication(id: string): Promise<IApplication | null> {
    return await ApplicationModel.findByIdAndDelete(id);
  }

  async getApplicationsByStatus(status: string): Promise<IApplication[]> {
    return await ApplicationModel.find({ status: status });
  }

  async getApplicationsByType(type: string): Promise<IApplication[]> {
    return await ApplicationModel.find({ applicantType: type });
  }
}

export default new ApplicationService();
