const connectionService = require("../services/connectionService");

exports.sendRequest = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
    const connection = await connectionService.sendRequest(fromUser, toUser);
    res.status(201).json({ message: "Request sent", connection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.acceptRequest = async (req, res) => {
  try {
    const { connectionId } = req.body;
    const connection = await connectionService.acceptRequest(connectionId);
    res.status(200).json({ message: "Request accepted", connection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.rejectRequest = async (req, res) => {
  try {
    const { connectionId } = req.body;
    const connection = await connectionService.rejectRequest(connectionId);
    res.status(200).json({ message: "Request rejected", connection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const connections = await connectionService.getConnections(userId);
    res.status(200).json(connections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await connectionService.getRequests(userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
