const mongoose = require("mongoose");
const { REQUEST_STATUS } = require("../constants/constant");

const requestSchema = new mongoose.Schema(
  {
    requestedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: REQUEST_STATUS, // ✅ use constant
      default: REQUEST_STATUS[0], // "pending"
    },
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      default: null,
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
module.exports = mongoose.model("Request", requestSchema);
