const mongoose = require("mongoose");

const billReminderSchema = new mongoose.Schema({
  billName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

const BillReminder = mongoose.model("BillReminder", billReminderSchema);

module.exports = BillReminder;