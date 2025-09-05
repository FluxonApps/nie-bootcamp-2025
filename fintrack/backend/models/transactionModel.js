const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);