const User = require("../models/user.model");

// Get all users (safe fields only, no password)
exports.getAllUsers = async () => {
  return await User.find({}, "name username email ");
};