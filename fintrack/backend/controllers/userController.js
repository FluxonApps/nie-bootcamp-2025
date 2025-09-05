const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.json(users || []);
};

const addUser = async (req, res) => {
  const savedUser = await userService.addUser(req.body);
  return res.status(201).json(savedUser || []);
};

// New: Get budget by userId
const getUserBudget = async (req, res) => {
  const { userId } = req.params;
  try {
    const budget = await userService.getBudgetByUserId(userId);
    if (budget === null) return res.status(404).json({ message: "User not found" });
    return res.json({ userId, budget });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers, addUser, getUserBudget };
