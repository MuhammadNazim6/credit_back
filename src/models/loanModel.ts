import mongoose, { Schema, Document, Model } from 'mongoose';

interface ILoanModel extends Document {
  userId: mongoose.Types.ObjectId;
  fullName:string;
  amount: number;
  tenure:number;
  employmentStatus:string;
  employmentAddress:string;
  reason:string;
  loanStatus:string;
  createdAt: Date;
  updatedAt: Date;
}

const LoanSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  employmentAddress: { type: String, required: true },
  reason: { type: String, required: true },
  loanStatus: { type: String, required: true, default: 'pending' }
}, {
  timestamps: true
});

const LoanModel = mongoose.model<ILoanModel>('Loan', LoanSchema);

export { LoanModel, ILoanModel };