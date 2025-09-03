const Transaction = require('../models/Transaction');
const User = require('../models/User');

// ➡ Add new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, type, amount, categoryName, categoryId, description, date } = req.body;

    const transaction = await Transaction.create({
      userId, type, amount, categoryName, categoryId, description, date
    });

    // Update budget dynamically if expense/income
    if (type === 'expense') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: -amount } });
    } else if (type === 'income') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: amount } });
    }

    res.status(201).json(transaction);
  } catch (err) {
    console.error('Error creating transaction:', err);
    res.status(500).json({ message: 'Server error while creating transaction' });
  }
};

// ➡ Get transactions (with filters)
exports.getTransactions = async (req, res) => {
  try {
    const { userId, type, category, startDate, endDate } = req.query;

    const query = { userId };
    if (type) query.type = type;
    if (category) query.categoryName = category;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Server error while fetching transactions' });
  }
};

// ➡ Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, userId } = req.body;

    const oldTransaction = await Transaction.findById(id);
    if (!oldTransaction) return res.status(404).json({ message: 'Transaction not found' });

    // Revert old amount from budget
    if (oldTransaction.type === 'expense') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: oldTransaction.amount } });
    } else if (oldTransaction.type === 'income') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: -oldTransaction.amount } });
    }

    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

    // Apply new adjustment to budget
    if (type === 'expense') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: -amount } });
    } else if (type === 'income') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: amount } });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ message: 'Server error while updating transaction' });
  }
};

// ➡ Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const transaction = await Transaction.findById(id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    // Revert budget
    if (transaction.type === 'expense') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: transaction.amount } });
    } else if (transaction.type === 'income') {
      await User.findByIdAndUpdate(userId, { $inc: { monthlyBudget: -transaction.amount } });
    }

    await transaction.deleteOne();
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ message: 'Server error while deleting transaction' });
  }
};
