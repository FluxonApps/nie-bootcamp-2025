const billReminderService = require('../services/billReminderService');

const getAllBills = async (req, res) => {
  try {
  
    const bills = await billReminderService.getAllBills(req.user.id);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await billReminderService.getBillById(req.params.id, req.user.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBill = async (req, res) => {
  try {
    const billData = { ...req.body, userId: req.user.id };
    const newBill = await billReminderService.addBill(billData);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const updatedBill = await billReminderService.updateBill(req.params.id, req.user.id, req.body);
    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(updatedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    const deletedBill = await billReminderService.deleteBill(req.params.id, req.user.id);
    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  addBill,
  updateBill,
  deleteBill,
};
