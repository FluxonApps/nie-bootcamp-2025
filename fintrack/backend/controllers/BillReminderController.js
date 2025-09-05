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

// @desc    Get all bill reminders
// @route   GET /api/bill-reminders
// @access  Private
const getBillReminders = async (req, res) => {
  try {
    // For now, we fetch all reminders. In a real app, you'd filter by userId.
    const reminders = await BillReminder.find({});
    res.status(200).json({ 
      success: true, 
      data: reminders 
    });
  } catch (error) {
    console.error("Error fetching bill reminders:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching reminders", 
      error: error.message 
    });
  }
};

// @desc    Delete a bill reminder
// @route   DELETE /api/bill-reminders/:id
// @access  Private
const deleteBillReminder = async (req, res) => {
  try {
    const reminder = await BillReminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({ 
        success: false, 
        message: "Reminder not found" 
      });
    }

    // In a real app, you would also check if the reminder belongs to the user.
    await reminder.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: "Bill reminder deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting bill reminder:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while deleting reminder", 
      error: error.message 
    });
  }
};

module.exports = { 
  createBillReminder, 
  getBillReminders, 
  deleteBillReminder 
};