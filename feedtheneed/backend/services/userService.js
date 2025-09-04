const User = require("../models/userModel");

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Add new user
const addUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Find user by username
const findByUsername = async (username) => {
  return await User.findOne({ username });
};

// Find user by ID (useful for admin checks / JWT decode)
const findById = async (id) => {
  return await User.findById(id);
};

module.exports = { getAllUsers, addUser, findByUsername, findById };
