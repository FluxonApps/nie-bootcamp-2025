const mongoose = require('mongoose');
const BillReminder = require("../models/billReminderModel");

// @desc    Create a new bill reminder
// @route   POST /api/bill-reminders
// @access  Private
const createBillReminder = async (req, res) => {
  try {
    const { billName, amount, date } = req.body;

    // Simple validation
    if (!billName || !amount || !date) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide bill name, amount, and date" 
      });
    }

    const reminder = new BillReminder({
      billName,
      amount,
      date,
      userId: new mongoose.Types.ObjectId('60d5ec49e92b293b2c8e4b4c'), // Using a fixed user ID for now
    });

    const createdReminder = await reminder.save();

    res.status(201).json({ 
      success: true, 
      data: createdReminder, 
      message: "Bill reminder created successfully" 
    });
  } catch (error) {
    console.error("Error creating bill reminder:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while creating reminder", 
      error: error.message 
    });
  }
};

module.exports = { createBillReminder };
