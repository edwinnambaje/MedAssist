import Reminder from '../models/Reminder';
import NotificationService from './notificationService';
import MedicineDetails from '../models/Medicine';
import { DateTime } from 'luxon';

class ReminderService {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  async scheduleReminders() {
    const currentDate = DateTime.now();

    const upcomingMedications = await MedicineDetails.find({
      duration: '7',
    }).populate('userId');

    for (const medicationDetail of upcomingMedications) {
      const id = medicationDetail._id
      const ido = await Reminder.findOne({
        id
      })
      const reminderTime = DateTime.fromJSDate(ido.scheduledAt);

      if (reminderTime.startOf('day') === currentDate.startOf('day')) {
        const reminderMessage = `Reminder: Take ${medicationDetail.form} of ${medicationDetail.medicineId} ${medicationDetail.frequency} times a day for ${medicationDetail.duration} days.`;

        const newReminder = new Reminder({
          userId: medicationDetail.userId,
          message: reminderMessage,
          scheduledAt: reminderTime.toJSDate(),
        });

        await newReminder.save();
        this.notificationService.emitNotification(medicationDetail.userId.toString(), reminderMessage);
      }
    }
  }
}

export default ReminderService;
