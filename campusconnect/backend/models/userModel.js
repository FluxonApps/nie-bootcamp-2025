const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
}, { timestamps: true });

module.exports = mongoose.model("user", userModel);
