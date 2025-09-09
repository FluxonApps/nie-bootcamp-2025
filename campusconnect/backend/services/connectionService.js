const Connection = require("../models/connectionModel");


exports.sendRequest = async (fromUser, toUser) => {
  const connection = await Connection.create({ fromUser, toUser });
  return connection;
};


exports.acceptRequest = async (connectionId) => {
  const connection = await Connection.findById(connectionId);
  if (!connection) throw new Error("Request not found");

  connection.status = "accepted";
  await connection.save();
  return connection;
};


exports.rejectRequest = async (connectionId) => {
  const connection = await Connection.findById(connectionId);
  if (!connection) throw new Error("Request not found");

  connection.status = "rejected";
  await connection.save();
  return connection;
};


exports.getConnections = async (userId) => {
  return Connection.find({
    $or: [{ fromUser: userId }, { toUser: userId }],
    status: "accepted",
  }).populate("fromUser toUser", "name username email");
};


exports.getRequests = async (userId) => {
  return Connection.find({ toUser: userId, status: "pending" }).populate(
    "fromUser",
    "name username email"
  );
};
