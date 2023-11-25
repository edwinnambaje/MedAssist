import mongoose from 'mongoose';

export interface IMedicineDetails extends mongoose.Document {
    medicineId: mongoose.Schema.Types.ObjectId;
    form: string;
    otherForm?: string;
    frequency: string;
    otherFrequency?: string;
    duration:string,
    otherDuration?: string;
    userId: mongoose.Schema.Types.ObjectId;
}

export const MedicineDetailsSchema = new mongoose.Schema({
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineName', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    form: { type: String, enum: ['pills', 'injection', 'drops', 'powder', 'other'] },
    duration: { type: String, enum: ['3', '5', '7', '14', 'other'] },
    otherForm: { type: String },
    otherDuration: { type: String },
    frequency: { type: String, enum: ['once', 'twice', 'thrice', 'other'] },
    otherFrequency: { type: String }
});

const MedicineDetails = mongoose.model<IMedicineDetails>('MedicineDetails', MedicineDetailsSchema);
export default MedicineDetails;
