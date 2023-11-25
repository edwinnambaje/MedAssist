import * as mongoose from "mongoose";

export interface IMedicine extends mongoose.Document {
    name: string;
    dosage: string;
    form: string,
    frequency: string
}

export const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    form: { type: String, required: true },
    frequency: { type: String, required: true },
});

const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;
