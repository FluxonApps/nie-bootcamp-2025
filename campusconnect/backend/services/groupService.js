const Group = require("../models/groupModel");

exports.getAllGroups = async () => {
  return await Group.find().populate("members.user", "name username email");
};

exports.getUserGroups = async (userId) => {
  return await Group.find({ "members.user": userId })
    .populate("members.user", "name username email");
};

exports.createGroup = async (groupData, creatorId) => {
  try {
    const newGroup = new Group({
      ...groupData,
      members: [{ user: creatorId, role: "admin" }],
    });
    return await newGroup.save();
  } catch (err) {
    console.error("Error creating group:", err.message);
    throw err;
  }
};

exports.addMember = async (groupId, userId, role = "member") => {
  const group = await Group.findById(groupId);
  if (!group) return null;

  const alreadyMember = group.members.find(
    (m) => m.user.toString() === userId
  );
  if (!alreadyMember) {
    group.members.push({ user: userId, role });
    return await group.save();
  }
  return group;
};
