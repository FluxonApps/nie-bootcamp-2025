const groupService = require("../services/groupService");

const getAllGroups = async (req, res) => {
  const groups = await groupService.getAllGroups();
  return res.json(groups || []);
};

const getUserGroups = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const groups = await groupService.getUserGroups(userId);
  return res.json(groups || []);
};

const createGroup = async (req, res) => {
  try {
    const creatorId = req.body.userId; // frontend must send userId
    const savedGroup = await groupService.createGroup(req.body, creatorId);
    return res.status(201).json(savedGroup);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const addMember = async (req, res) => {
  const { groupId } = req.params;
  const { userId, role } = req.body;

  const updatedGroup = await groupService.addMember(groupId, userId, role);
  if (!updatedGroup) {
    return res
      .status(404)
      .json({ message: "Group not found or failed to update" });
  }
  return res.json(updatedGroup);
};

module.exports = { getAllGroups, getUserGroups, createGroup, addMember };
