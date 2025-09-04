// const Connection = require("../models/connectionModel");


// exports.sendRequest = async (fromUser, toUser) => {
//   const connection = await Connection.create({ fromUser, toUser });
//   return connection;
// };


// exports.acceptRequest = async (connectionId) => {
//   const connection = await Connection.findById(connectionId);
//   if (!connection) throw new Error("Request not found");

//   connection.status = "accepted";
//   await connection.save();
//   return connection;
// };


// exports.rejectRequest = async (connectionId) => {
//   const connection = await Connection.findById(connectionId);
//   if (!connection) throw new Error("Request not found");

//   connection.status = "rejected";
//   await connection.save();
//   return connection;
// };


// exports.getConnections = async (userId) => {
//   return Connection.find({
//     $or: [{ fromUser: userId }, { toUser: userId }],
//     status: "accepted",
//   }).populate("fromUser toUser", "name username email");
// };


// exports.getRequests = async (userId) => {
//   return Connection.find({ toUser: userId, status: "pending" }).populate(
//     "fromUser",
//     "name username email"
//   );
// };



const Connection = require("../models/connectionModel");

// Send a connection request
exports.sendRequest = async (fromUser, toUser) => {
  const connection = await Connection.create({ fromUser, toUser });
  return connection;
};

// Accept a connection request
exports.acceptRequest = async (connectionId) => {
  const connection = await Connection.findById(connectionId);
  if (!connection) throw new Error("Request not found");

  connection.status = "accepted";
  await connection.save();
  return connection;
};

// Reject a connection request
exports.rejectRequest = async (connectionId) => {
  const connection = await Connection.findById(connectionId);
  if (!connection) throw new Error("Request not found");

  connection.status = "rejected";
  await connection.save();
  return connection;
};

// Get all accepted connections for a user
exports.getConnections = async (userId) => {
  const connections = await Connection.find({
    $or: [{ fromUser: userId }, { toUser: userId }],
    status: "accepted",
  }).populate("fromUser toUser", "name username email");

  // Return only the "other user" in each connection
  return connections.map((conn) => {
    if (conn.fromUser._id.toString() === userId) {
      return conn.toUser; // show receiver if logged-in user is sender
    } else {
      return conn.fromUser; // show sender if logged-in user is receiver
    }
  });
};

// Get all pending requests for a user
exports.getRequests = async (userId) => {
  return Connection.find({ toUser: userId, status: "pending" }).populate(
    "fromUser",
    "name username email"
  );
};
