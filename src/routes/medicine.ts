import express from 'express';
import * as MedicineNameController from '../controllers/medicineName';

const router = express.Router();

router.post('/add', MedicineNameController.createMedicineName);
router.get('/all', MedicineNameController.getAllMedicineNames);
router.get('/:id', MedicineNameController.getMedicineNameById);
router.put('/:id', MedicineNameController.updateMedicineNameById);
router.delete('/:id', MedicineNameController.deleteMedicineNameById);

export default router;
