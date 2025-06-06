import mongoose, { Schema, model, Document } from "mongoose";

export interface IApplication extends Document {
  idNumber: string;
  firstName: string;
  lastName: string;
  applicationPhone: string;
  applicationEmail: string;
  applicantType: string;
  applicationReason: string;
  applicationType: string;
  companyName?: string;
  companyType?: string;
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
  lawyerId?: mongoose.Schema.Types.ObjectId;
  violationId?: mongoose.Schema.Types.ObjectId;
}

const ApplicationSchema = new Schema<IApplication>(
  {
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
    status: { type: String, default: "pending" },
    files: {
      type: [
        {
          fileKey: { type: String },
        },
      ],
      default: [],
    },
    resources: {
      type: [
        {
          url: { type: String },
        },
      ],
      default: [],
    },
    violationId: { type: mongoose.Schema.Types.ObjectId, ref: "Violation", required: false },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer", required: false },
  },
  {
    timestamps: true,
  }
);

const ApplicationModel = model<IApplication>("Application", ApplicationSchema);

export default ApplicationModel;
