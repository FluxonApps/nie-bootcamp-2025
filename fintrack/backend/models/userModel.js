const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
  address: String,
});

module.exports = mongoose.model("user", userModel);
