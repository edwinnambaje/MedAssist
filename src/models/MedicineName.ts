// MedicineNamesModel.ts
import mongoose from 'mongoose';

export interface IMedicineName extends mongoose.Document {
    name: string;
}

export const MedicineNameSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const MedicineName = mongoose.model<IMedicineName>('MedicineName', MedicineNameSchema);
export default MedicineName;
