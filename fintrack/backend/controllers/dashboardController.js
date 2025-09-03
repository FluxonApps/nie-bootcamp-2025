const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getDashboardSummary = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    const totalIncome = transactions
      .filter(tx => tx.type === 'income')
      .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpense = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((acc, tx) => acc + tx.amount, 0);

    const remaining = user.monthlyBudget;

    const recentTransactions = transactions.slice(0, 5);

    res.json({
      totalIncome,
      totalExpense,
      remaining,
      recentTransactions
    });
  } catch (err) {
    console.error('Error fetching dashboard summary:', err);
    res.status(500).json({ message: 'Server error fetching summary' });
  }
};
