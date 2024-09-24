import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  isGoogle: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUserModel> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isGoogle: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
);

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export { UserModel, IUserModel };
