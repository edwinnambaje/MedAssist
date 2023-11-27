import mongoose, { Schema, Document } from 'mongoose';
export interface IReminder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  medicineDetailsId: mongoose.Schema.Types.ObjectId;
  reason: string;
  customReason?: string,
  scheduledAt: string;
  reminderNote?: string,
  intakeStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isSent:Boolean
}

const ReminderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medicineDetailsId: { type: Schema.Types.ObjectId, ref: 'MedicineDetails', required: true },
  reason: { type: String, enum: ['Pain relief', 'Fever reduction', 'Management of hypertension', 'Allergies', 'Bacterial infections', 'Anxiety', 'Diabetes', 'Other'], required: true },
  customReason: { type: String },
  scheduledAt: { type: String, required: true },
  reminderNote: { type: Date },
  intakeStatus: { type: String, enum: ['onTime', 'late', 'missed'] },
  isSent: { type: Boolean, default:false },
},{
  timestamps:true
});

const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);
export default Reminder;
