import MedicineName from '../models/MedicineName';

const medicineNames = [
  'Acetaminophen', 'Albuterol', 'Amlodipine', 'Amoxicillin', 'Aspirin', 'Atorvastatin', 'Digoxin', 'Diltiazem', 'Doxycycline', 'Olanzapine', 'Omeprazole', 'Paracetamol',
  'Pantoprazole', 'Phenobarbital', 'Pioglitazone', 'Prednisolone', 'Propranolol', 'Quetiapine',
];

const seedMedicineNames = async () => {
  try {
    for (const medicineName of medicineNames) {
      const newMedicine = new MedicineName({
        name: medicineName,
      });
      await newMedicine.save();
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
export default seedMedicineNames;