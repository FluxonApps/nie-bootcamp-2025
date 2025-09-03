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
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(DONATION_STATUS), 
      default: DONATION_STATUS.ACTIVE,      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
