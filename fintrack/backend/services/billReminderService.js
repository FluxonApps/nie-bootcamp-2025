const BillReminder = require('../models/billReminderModel');

const getAllBills = async (userId) => {
  return await BillReminder.find({ userId });
};

const getBillById = async (id, userId) => {
  return await BillReminder.findOne({ _id: id, userId });
};

const addBill = async (billData) => {
  const newBill = new BillReminder(billData);
  return await newBill.save();
};

const updateBill = async (id, userId, updateData) => {
  return await BillReminder.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
};

const deleteBill = async (id, userId) => {
  return await BillReminder.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  getAllBills,
  getBillById,
  addBill,
  updateBill,
  deleteBill,
};
