import { Schema, model, Document } from 'mongoose';

export interface IApplication extends Document {
  idNumber: string;
  firstName: string;
  lastName: string;
  applicationPhone: string;
  applicationEmail: string;
  applicantType: string;
  applicationReason: string;
  applicationType: string;
  companyName: string;
  companyType: string;
  status: string;
  files: [
    {
      fileKey: string;
      description: string;
    }
  ];
  resources: [
    {
      url: string;
    }
  ];
}

const ApplicationSchema = new Schema<IApplication>({
  idNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  applicationPhone: { type: String, required: true },
  applicationEmail: { type: String, required: true },
  applicantType: { type: String, required: true },
  applicationReason: { type: String, required: true },
  applicationType: { type: String, required: true },
  companyName: { type: String, required: false },
  companyType: { type: String, required: false },
  status: { type: String, default: 'pending' },
  files: { type: [
    {
        fileKey: { type: String },
        description: { type: String  }
    }
], default: [] },
resources: { type: [
  {
      url: { type: String, }
  }
], default: [] }
},
{
  timestamps: true
});

const ApplicationModel = model<IApplication>('Application', ApplicationSchema);

export default ApplicationModel;
