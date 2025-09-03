const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userdetails", // sender of request
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userdetails", // receiver of request
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
