import connectDB from '../config/db'
import seedMedicineNames from './medicine'

connectDB().then(async () => {
  try {
    await seedMedicineNames()
    console.log('Database seeded Successfully')
    process.exit()
  } catch (error) {
    console.log('database seed errors ', { error })
    process.exit()
  }
})