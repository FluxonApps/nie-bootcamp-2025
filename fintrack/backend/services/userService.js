const User = require("../models/userModel");

exports.getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    return [];
  } else return users;
};

exports.addUser = async (user) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch {
    console.log("Error saving new user");
    return;
  }
};

// New: Get budget by userId
exports.getBudgetByUserId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return null;
  return user.budget; // make sure 'budget' exists in your User schema
};
