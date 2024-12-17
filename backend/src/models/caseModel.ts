import mongoose, { Schema, model, Document, mongo } from 'mongoose';

export interface ICase extends Document {
    applicationId: mongoose.Schema.Types.ObjectId;
    protectedPersonName: string;
    protectedPersonSurname: string;
    protectedPersonTCNumber: Number;
    lawyerId: mongoose.Schema.Types.ObjectId;
    caseNumber: number;
    caseReason: string;
    courtName: string;
    indictment: string;
    files: [
        {
            fileKey: string;
            description: string;
        }
    ]
    resources: [
        {
            url: string;
        }
    ]
    result: string;
    resultPhase: string;
}

const CaseSchema = new Schema<ICase>({
    applicationId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Application", default: null },
    protectedPersonName: { type: String, default: "" },
    protectedPersonSurname: { type: String, default: "" },
    protectedPersonTCNumber: { type: Number, default: 0 },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User", default: null },
    caseNumber: { type: Number, default: 0 },
    caseReason: { type: String, default: "" },
    courtName: { type: String, default: "" },
    indictment: { type: String, default: "" },
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
    ], default: [] },
    result: { type: String, default: "" },
    resultPhase: { type: String, default: "" }
},
{
    timestamps: true
});

const CaseModel = model<ICase>('Case', CaseSchema);

export default CaseModel;