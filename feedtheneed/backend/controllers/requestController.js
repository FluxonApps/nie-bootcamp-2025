const requestService = require("../services/requestService");

const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    return res.json(requests || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const addRequest = async (req, res) => {
  try {
    const { requestedId, status, donationId, UpdatedBy } = req.body;

    if (!requestedId) {
      return res.status(400).json({ error: "requestedId is required" });
    }

    const savedRequest = await requestService.addRequest({
      requestedId,
      status,
      donationId,
      UpdatedBy,
    });

    return res.status(201).json(savedRequest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

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