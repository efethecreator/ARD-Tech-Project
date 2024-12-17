import { Schema, model } from "mongoose";

export interface IViolation {
    category?: string;
    scanPeriod?: string;
    eventCategory?: string;
    eventSummary?: string;
    source?: string;
    link?: string;
    visualLink?: string;
    files?: [
        {
            fileKey: string;
            description: string;
        }
    ]
    notificationInstitution?: string;
    commissionCase?: string;
    publicInstitution?: string;
}

const ViolationSchema = new Schema<IViolation>({
    category: { type: String, default: "" },
    scanPeriod: { type: String, default: "" },
    eventCategory: { type: String, default: "" },
    eventSummary: { type: String, default: "" },
    source: { type: String, default: "" },
    link: { type: String, default: "" },
    visualLink: { type: String, default: "" },
    files: { type: [
        {
            fileKey: { type: String },
            description: { type: String  }
        }
    ], default: [] },
    notificationInstitution: { type: String, default: "" },
    commissionCase: { type: String, default: "" },
    publicInstitution: { type: String, default: "" },
},
{
    timestamps: true
}
);

export default model<IViolation>("Violation", ViolationSchema);