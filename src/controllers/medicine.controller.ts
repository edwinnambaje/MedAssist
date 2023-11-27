import { NextFunction, Request, Response } from 'express';
import MedicineDetails from '../models/Medicine';
import MedicineName from '../models/MedicineName';
import { BadRequestError, NotFoundError } from '../errors';
import { IUser } from '../models/User';
import { successResponse } from '../utils';

interface ExtendedRequest extends Request {
    user: IUser;
}

export const createMedicineDetailsForUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { medicineId } = req.params;
        const medicineName = await MedicineName.findById(medicineId);
        if (!medicineName) {
            throw new NotFoundError('Medicine not found')
        }
        const med= await MedicineDetails.findOne({
            medicineId
        })
        if(med){
            throw new BadRequestError('Medicine Already exists')
        }
        const { user } = req;
        const { form, frequency, howLong, otherForm, otherFrequency, otherHowLong } = req.body;
        const lowercaseFrequency = frequency.toLowerCase();
        const lowercaseForm = form.toLowerCase();
        const newMedicineDetails = new MedicineDetails({
            medicineId,
            form: lowercaseForm === "other" ? otherForm : lowercaseForm,
            frequency: lowercaseFrequency === "other" ? otherFrequency : lowercaseFrequency,
            howLong: howLong === "other" ? otherHowLong : howLong,
            userId:user. _id
        });
        const savedMedicineDetails = await newMedicineDetails.save();
        user.medicineDetails = newMedicineDetails._id;
        await user.save();
        return res.send(successResponse("Medication added successully", savedMedicineDetails));
    } catch (error) {
        next(error);
    }
};
export const getMedicineDetailsForUser = async (req: ExtendedRequest, res: Response, next:NextFunction) => {
    try {
        const { _id } = req.user;
        const medicineDetails = await MedicineDetails.find({ userId:_id }).populate('userId');;
        if(!medicineDetails){
            throw new NotFoundError('No medication for this user')
        }
        return res.send(successResponse(null, medicineDetails));
    } catch (error) {
        next(error);
    }
};