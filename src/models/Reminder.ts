import * as mongoose from "mongoose";

export interface IReminder extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    medicineId: mongoose.Schema.Types.ObjectId;
    reminderTime: Date;
}

export const ReminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
    reminderTime: { type: Date, required: true },
});

const Reminder = mongoose.model<IReminder>("Reminder", ReminderSchema);
export default Reminder;
