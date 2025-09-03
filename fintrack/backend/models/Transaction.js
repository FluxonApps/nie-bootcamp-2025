const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  categoryName: { type: String },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  paymentMode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
