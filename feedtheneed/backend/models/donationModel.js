const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // donor must be a User
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "clothes", "books", "other"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "fulfilled", "cancelled"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Donation", donationSchema);
