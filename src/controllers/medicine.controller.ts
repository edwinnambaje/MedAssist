import { NextFunction, Request, Response } from 'express';
import Medicine from '../models/Medicine';
import { NotFoundError } from '../errors';
import { successResponse } from '../utils';

class MedicineController {
    static async getAllMedicines(req: Request, res: Response, next: NextFunction) {
        try {
            const medicines = await Medicine.find();
            return res.send(successResponse(null, medicines));
        } catch (error) {
            next(error);
        }
    }
    static async getMedicineById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const medicine = await Medicine.findById(id);
            if (!medicine) {
                throw new NotFoundError('Medicine not found');
            }
            return res.send(successResponse(null, medicine));
        } catch (error) {
            next(error);
        }
    }

    static async createMedicine(req: Request, res: Response, next:NextFunction) {
        const { name, dosage, frequency , form } = req.body;
        try {
            if (name) {
                throw new NotFoundError("Medication already exists")
            }
            const newMedicine = new Medicine({ name, dosage, frequency, form });
            await newMedicine.save();
            return res.send(successResponse('Medication created successfully', newMedicine));
        } catch (error) {
            next(error);
        }
    }
    static async updateMedicine(req: Request, res: Response, next:NextFunction) {
        const { id } = req.params;
        const { name, dosage } = req.body;
        try {
            const updatedMedicine = await Medicine.findByIdAndUpdate(
                id,
                { name, dosage },
                { new: true }
            );
            if (!updatedMedicine) {
                throw new NotFoundError('Medication not found');
            }
            return res.send(successResponse(null, updatedMedicine));
        } catch (error) {
            next(error);
        }
    }
    static async deleteMedicine(req: Request, res: Response, next:NextFunction) {
        const { id } = req.params;
        try {
            const deletedMedicine = await Medicine.findByIdAndDelete(id);
            if (!deletedMedicine) {
                throw new NotFoundError('Medication not found');
            }
            return res.send(successResponse('Medication deleted successfully', deletedMedicine));
        } catch (error) {
            next(error);
        }
    }
}

export default MedicineController;
