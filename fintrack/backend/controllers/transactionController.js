const Transaction = require("../models/transactionModel");

const getAll = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOne = async (req, res) => {
  try {
    const { type, amount, description, categoryId, userId, date } = req.body;
    if (!type || !amount || !categoryId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newTransaction = new Transaction({
      type,
      amount,
      description,
      categoryId,
      userId,
      date: date || Date.now(),
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOne, getAll, deleteOne, updateOne };
