const User = require("../models/userModel");

const getAllUsers = async () => {
  return await User.find();
};

const addUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = { getAllUsers, addUser, findByUsername };
