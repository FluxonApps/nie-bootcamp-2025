const mongoose = require("mongoose");


const userModel = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
  address: String,
});

module.exports = mongoose.model("user", userModel);

const bcrypt = require("bcryptjs");
 

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // assuming you have a Product model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
