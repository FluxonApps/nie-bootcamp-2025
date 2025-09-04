const mongoose = require("mongoose");
const { DONATION_STATUS } = require("../constants/constant");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: DONATION_STATUS, // ✅ use constants for status
      default: DONATION_STATUS[0], // e.g. "available"
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Donation", donationSchema);

