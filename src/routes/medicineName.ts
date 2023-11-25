import express from 'express';
import * as MedicineDetailsController from '../controllers/medicine.controller';
import { authenticate } from '../middlewares/auth';

const medicinedetailsRouter = express.Router();
medicinedetailsRouter.post('/add/:medicineId',authenticate, MedicineDetailsController.createMedicineDetailsForUser);
medicinedetailsRouter.get('/user', authenticate, MedicineDetailsController.getMedicineDetailsForUser)

export default medicinedetailsRouter;
