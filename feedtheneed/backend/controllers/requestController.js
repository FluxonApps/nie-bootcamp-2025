const requestService = require("../services/requestService.js");

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new request
const addRequest = async (req, res) => {
  try {
    const savedRequest = await requestService.addRequest(req.body);
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await requestService.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const updatedRequest = await requestService.updateRequestStatus(
      req.params.id,
      req.body.status
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const deleted = await requestService.deleteRequest(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRequests,
  addRequest,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
};

