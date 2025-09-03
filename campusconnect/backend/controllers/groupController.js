// controllers/groupController.js
const groupService = require("../services/groupService");

const getAllGroups = async (req, res) => {
  const groups = await groupService.getAllGroups();
  return res.json(groups || []);
};

const createGroup = async (req, res) => {
  const savedGroup = await groupService.createGroup(req.body);
  return res.status(201).json(savedGroup || {});
};

const addMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId, role } = req.body;

  const updatedGroup = await groupService.addMember(groupId, userId, role);
  if (!updatedGroup) {
    return res.status(404).json({ message: "Group not found or failed to update" });
  }
  return res.json(updatedGroup);
};

module.exports = { getAllGroups, createGroup, addMember };
