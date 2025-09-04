const mongoose = require("mongoose");

const billReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  billName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  frequency: { 
    type: String, 
    enum: ['one-time', 'weekly', 'monthly', 'yearly'],
    default: 'one-time'
  },
  isPaid: { type: Boolean, default: false },
  googleCalendarEventId: String,
}, { timestamps: true });

module.exports = mongoose.model('BillReminder', billReminderSchema);
