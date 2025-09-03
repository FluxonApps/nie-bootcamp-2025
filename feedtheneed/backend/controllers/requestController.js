const requestService = require("../services/requestService");

// GET all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    return res.json(requests || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ADD new request
const addRequest = async (req, res) => {
  try {
    const { userId, title, description, category, location } = req.body;

    if (!userId || !title || !description || !category || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const savedRequest = await requestService.addRequest({
      userId,
      title,
      description,
      category,
      location,
    });

    return res.status(201).json(savedRequest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.json(request);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// UPDATE request
const updateRequest = async (req, res) => {
  try {
    const updated = await requestService.updateRequest(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE request
const deleteRequest = async (req, res) => {
  try {
    const deleted = await requestService.deleteRequest(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.json({ message: "Request deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRequests,
  addRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
};