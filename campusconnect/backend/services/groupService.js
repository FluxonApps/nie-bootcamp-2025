// services/groupService.js
const Group = require("../models/groupModel");

exports.getAllGroups = async () => {
  const groups = await Group.find().populate("members.user", "name username email");
  return groups || [];
};

exports.createGroup = async (groupData) => {
  try {
    const newGroup = new Group(groupData);
    return await newGroup.save();
  } catch (err) {
    console.error("Error creating group:", err.message);
    return;
  }
};

exports.addMember = async (groupId, userId, role = "member") => {
  try {
    const group = await Group.findById(groupId);
    if (!group) return null;

    const alreadyMember = group.members.find(m => m.user.toString() === userId);
    if (!alreadyMember) {
      group.members.push({ user: userId, role });
      return await group.save();
    }
    return group; // return existing if already present
  } catch (err) {
    console.error("Error adding member:", err.message);
    return;
  }
};
