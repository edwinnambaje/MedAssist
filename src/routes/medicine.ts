import express from 'express';
import MedicineController  from '../controllers/medicine.controller';

const medrouter = express.Router();
medrouter.post('/add', MedicineController.createMedicine);
medrouter.get('/all', MedicineController.getAllMedicines);
medrouter.get('/:id', MedicineController.getMedicineById);
medrouter.put('/:id', MedicineController.updateMedicine);
medrouter.delete('/:id', MedicineController.deleteMedicine);

export default medrouter;
