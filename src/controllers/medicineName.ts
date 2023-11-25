import { NextFunction, Request, Response } from 'express';
import MedicineName from '../models/MedicineName';
import { NotFoundError } from '../errors/index';
import { successResponse } from '../utils';

export const createMedicineName = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { name } = req.body;
        const newMedicineName = new MedicineName({ name });
        const savedMedicineName = await newMedicineName.save();
        return res.send(successResponse("Medicine added successully", savedMedicineName));
    } catch (error) {
       next(error);
    }
};

export const getAllMedicineNames = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const medicineNames = await MedicineName.find();
        return res.send(successResponse(null, medicineNames));
    } catch (error) {
        next(error);
    }
};

export const getMedicineNameById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const medicineName = await MedicineName.findById(id);
        if (!medicineName) {
            throw new NotFoundError('Medicine name not found')
        }
        return res.send(successResponse(null, medicineName));
    } catch (error) {
        next(error);
    }
};

export const updateMedicineNameById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedMedicineName = await MedicineName.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedMedicineName) {
            throw new NotFoundError('Medicine name not found')
        }
        return res.send(successResponse('Medicine updated successfully', updatedMedicineName));
    } catch (error) {
       next(error);
    }
};

export const deleteMedicineNameById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const deletedMedicineName = await MedicineName.findByIdAndDelete(id);
        if (!deletedMedicineName) {
            throw new NotFoundError('Medicine name not found')
        }
        return res.send(successResponse("Medicine deleted successfully", deletedMedicineName));
    } catch (error) {
       next(error);
    }
};
