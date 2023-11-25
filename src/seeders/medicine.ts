import MedicineName from '../models/MedicineName';

const medicineNames = [
  'Acetaminophen', 'Albuterol', 'Amlodipine', 'Amoxicillin', 'Aspirin', 'Atorvastatin',
  'Azithromycin', 'Bisoprolol', 'Ciprofloxacin', 'Clopidogrel', 'Codeine', 'Citalopram',
  'Clindamycin', 'Cloxacillin', 'Diclofenac', 'Digoxin', 'Diltiazem', 'Doxycycline',
  'Enalapril', 'Esomeprazole', 'Furosemide', 'Gabapentin', 'Gliclazide', 'Hydrochlorothiazide',
  'Ibuprofen', 'Insulin', 'Irbesartan', 'Isosorbide', 'Lamotrigine', 'Lansoprazole',
  'Levofloxacin', 'Levothyroxine', 'Lisinopril', 'Loratadine', 'Losartan', 'Metformin',
  'Methotrexate', 'Metoprolol', 'Naproxen', 'Olanzapine', 'Omeprazole', 'Paracetamol',
  'Pantoprazole', 'Phenobarbital', 'Pioglitazone', 'Prednisolone', 'Propranolol', 'Quetiapine',
  'Ramipril', 'Ranitidine', 'Rosuvastatin', 'Sertraline', 'Simvastatin', 'Sildenafil',
  'Spironolactone', 'Sulphadoxine-Pyrimethamine', 'Tamsulosin', 'Telmisartan', 'Temazepam',
  'Tenofovir', 'Terbinafine', 'Tetanus Toxoid', 'Tramadol', 'Trimethoprim-Sulfamethoxazole',
  'Valproic Acid', 'Valsartan', 'Venlafaxine', 'Warfarin', 'Zidovudine', 'Zolpidem',
  'Atenolol', 'Risperidone', 'Carvedilol', 'Mefenamic Acid', 'Levonorgestrel', 'Desogestrel',
  'Ethinyl Estradiol', 'Metronidazole', 'Fluticasone', 'Chloroquine', 'Diazepam', 'Doxazosin',
  'Efavirenz', 'Famotidine', 'Glimepiride', 'Haloperidol', 'Hydroxychloroquine', 'Imipramine',
  'Isoniazid', 'Ketoconazole', 'Methyldopa', 'Miconazole', 'Nifedipine', 'Nystatin',
  'Oxcarbazepine', 'Paroxetine', 'Pyrantel Pamoate', 'Quinine', 'Sertraline', 'Terazosin'
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