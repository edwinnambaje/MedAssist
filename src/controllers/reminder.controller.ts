import { NextFunction, Request, Response } from 'express';
import MedicineDetails from '../models/Medicine';
import MedicineName from '../models/MedicineName';
import { BadRequestError, NotFoundError } from '../errors';
import User, { IUser } from '../models/User';
import { successResponse } from '../utils';
import Reminder from '../models/Reminder';
import sendEmail from '../utils/sendEmail';

interface ExtendedRequest extends Request {
    user: IUser;
}

export const createReminder = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { medicineDetailsId } = req.params;
        const medicineDetails = await MedicineDetails.findById(medicineDetailsId);
        if (!medicineDetails) {
            throw new NotFoundError('Medication details not found')
        }
        let { scheduledAt, reason, customReason, reminderNote } = req.body;
        const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(scheduledAt)) {
            throw new BadRequestError('Invalid scheduledAt format. Please provide time in HH:mm format');
        }
        const newReminder = new Reminder({
            userId: req.user._id,
            medicineDetailsId,
            reason,
            scheduledAt,
            reminderNote,
            customReason: reason === 'Other' ? customReason : null,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newReminder.save();
        return res.send(successResponse("Reminder added successfully", newReminder));
    } catch (error) {
        next(error);
    }
};

export const getRemindersForUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const medicineDetails = await Reminder.find({ userId: _id }).populate('userId').populate('medicineDetailsId');;
        if (!medicineDetails) {
            throw new NotFoundError('No Reminders for this user')
        }
        return res.send(successResponse(null, medicineDetails));
    } catch (error) {
        next(error);
    }
};
export const confirmMedicationIntake = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { reminderId } = req.params;
        const { intakeStatus } = req.body;

        const reminder = await Reminder.findById(reminderId);
        if (!reminder) {
            throw new NotFoundError('Reminder not found');
        }
        const intake = await Reminder.find({ intakeStatus })
        if (!intake) {
            throw new BadRequestError('Status not found');
        }
        const sentTimestamp = reminder.createdAt;
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - new Date(sentTimestamp).getTime();
        const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
        if (timeDifferenceInMinutes > 30) {
            reminder.intakeStatus = 'late';
        } else {
            reminder.intakeStatus = intakeStatus;
        }
        await reminder.save();
        return res.send(successResponse('Medication intake status updated successfully', reminder));
    } catch (error) {
        next(error);
    }
};

export const remindUser = async () => {
    try {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const formattedCurrentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        const reminders = await Reminder.find({
            scheduledAt: formattedCurrentTime,
            isSent: false 
        });

        if (reminders.length > 0) {
            reminders.forEach(async (reminder) => {
                const { userId, medicineDetailsId, scheduledAt } = reminder;
                const user = await User.findById(userId);
                const { medicineId } = await MedicineDetails.findById(medicineDetailsId);
                const med = await MedicineName.findById(medicineId)
                const emailSubject = 'Time for Your Medication! ';
                const htmlTemplate = `<div>
                <p>Hi ${user.username} ,</p>
                <p>It's time to take your meds! 🌟</p>
                <ul>
                    <li>Medication: ${med.name}</li>
                    <li>Time: ${scheduledAt}</li>
                    <li>Reason: ${reminder.reason}</li>
                </ul>
                <p>Click <a href=${process.env.link}>here</a> to confirm you've taken it on time.</p>
                <p>Stay healthy!<br>MedAssist Team</p>
                </div>`;
                try {
                    await sendEmail(user.email, emailSubject, htmlTemplate);
                    reminder.isSent= true;
                    await reminder.save()
                } catch (error) {
                    console.error('Error sending reminder email:', error);
                }

            });
        }
    } catch (error) {
        console.error('Error processing reminders:', error);
    }
};
