import express from 'express';
import { confirmMedicationIntake, createReminder, getRemindersForUser } from '../controllers/reminder.controller';
import { authenticate } from '../middlewares/auth';
const router = express.Router();

router.post('/add/:medicineDetailsId', authenticate , createReminder);
router.put('/confirm/:reminderId', authenticate , confirmMedicationIntake);
router.get('/all', authenticate, getRemindersForUser);
export default router;
