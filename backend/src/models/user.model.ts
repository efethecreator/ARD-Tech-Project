import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
  TCNumber: string;
  userRole: string;
  authentication: {
    password: string;
    salt: string;
  };
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  TCNumber: {
    type: String,
    required: [true, "TCNumber is required"],
    unique: true,
  }, 
  userRole: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
  },
},
{
  timestamps: true,
}
);

export default mongoose.model<IUser>("User", UserSchema);
