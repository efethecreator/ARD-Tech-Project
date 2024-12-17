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
    category: { type: String, required: false },
    scanPeriod: { type: String, required: false },
    eventCategory: { type: String, required: false },
    eventSummary: { type: String, required: false },
    source: { type: String, required: false },
    link: { type: String, required: false },
    visualLink: { type: String, required: false },
    files: { type: [
        {
            fileKey: { type: String },
            description: { type: String  }
        }
    ], default: [] },
    notificationInstitution: { type: String, required: false },
    commissionCase: { type: String, required: false },
    publicInstitution: { type: String, required: false },
},
{
    timestamps: true
}
);

export default model<IViolation>("Violation", ViolationSchema);