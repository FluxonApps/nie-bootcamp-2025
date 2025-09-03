const mongoose = require("mongoose");
const { REQUEST_STATUS } = require("../constants/constant");

const requestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // A request is made by a recipient (User)
      required: true,
    },
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation", // Link to the donation being requested
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(REQUEST_STATUS), 
      default: REQUEST_STATUS.PENDING,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Request", requestSchema);
