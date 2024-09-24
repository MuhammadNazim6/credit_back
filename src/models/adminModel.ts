import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAdminModel extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema: Schema<IAdminModel> = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  },
  {
    timestamps: true
  }
);

const AdminModel: Model<IAdminModel> = mongoose.model<IAdminModel>('Admin', adminSchema);

export { AdminModel, IAdminModel };
