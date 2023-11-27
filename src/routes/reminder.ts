import express from 'express';
import { createReminder, getRemindersForUser } from '../controllers/reminder.controller';
import { authenticate } from '../middlewares/auth';
const router = express.Router();

router.post('/add/:medicineDetailsId', authenticate , createReminder);
router.get('/all', authenticate, getRemindersForUser);
export default router;
