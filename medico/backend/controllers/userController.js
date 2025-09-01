const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.json(users || []);
};

const addUser = async (req, res) => {
  const savedUser = await userService.addUser(req.body);
  return res.status(201).json(savedUser || []);
};

module.exports = { getAllUsers, addUser };
