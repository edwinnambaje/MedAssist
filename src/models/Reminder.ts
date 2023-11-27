import mongoose, { Schema, Document } from 'mongoose';
export interface IReminder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  medicineDetailsId: mongoose.Schema.Types.ObjectId;
  reason: string;
  scheduledAt: Date;
  reminderNote?: string
}

const ReminderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medicineDetailsId: { type: Schema.Types.ObjectId, ref: 'MedicineDetails', required: true },
  reason: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  reminderNote: { type: Date },
});

export default mongoose.model<IReminder>('Reminder', ReminderSchema);
