const Transaction = require("../models/transactionModel");

const getAll = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.id }).populate("categoryId", "name");
    // Map to include categoryName
    const formattedTransactions = transactions.map((t) => ({
      _id: t._id,
      userId: t.userId,
      type: t.type.charAt(0).toUpperCase() + t.type.slice(1), // Capitalize type
      amount: t.amount,
      categoryId: t.categoryId._id,
      categoryName: t.categoryId.name,
      description: t.description,
      date: t.date,
    }));
    res.status(200).json(formattedTransactions);
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
    const populatedTransaction = await Transaction.findById(newTransaction._id).populate("categoryId", "name");
    res.status(201).json({
      _id: populatedTransaction._id,
      userId: populatedTransaction.userId,
      type: populatedTransaction.type.charAt(0).toUpperCase() + populatedTransaction.type.slice(1),
      amount: populatedTransaction.amount,
      categoryId: populatedTransaction.categoryId._id,
      categoryName: populatedTransaction.categoryId.name,
      description: populatedTransaction.description,
      date: populatedTransaction.date,
    });
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
    ).populate("categoryId", "name");
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({
      _id: updatedTransaction._id,
      userId: updatedTransaction.userId,
      type: updatedTransaction.type.charAt(0).toUpperCase() + updatedTransaction.type.slice(1),
      amount: updatedTransaction.amount,
      categoryId: updatedTransaction.categoryId._id,
      categoryName: updatedTransaction.categoryId.name,
      description: updatedTransaction.description,
      date: updatedTransaction.date,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOne, getAll, deleteOne, updateOne };