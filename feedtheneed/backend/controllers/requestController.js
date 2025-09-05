const requestService = require("../services/requestService");
const { REQUEST_STATUS, ROLES } = require("../constants/constant");
const Request = require("../models/requestModel"); // <-- add this import

const getAllRequests = async (req, res) => {
  try {
    let requests;

    if (req.user.role === "admin") {
      // Admin can see all requests
      requests = await requestService.getAllRequests(req.user); 
    } else if (req.user.role === "recipient") {
      // Recipient can only see their own requests
      requests = await requestService.getRequestsByUser(req.user.id);
    } else {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.json(requests || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const addRequest = async (req, res) => {
  try {
    const userRole = req.user?.role;

    if (userRole !== ROLES[1]) { // ROLES[1] = "recipient"
      return res.status(403).json({ error: "Only recipients can create requests" });
    }

    const { donationId, UpdatedBy } = req.body;

    if (!donationId) {
      return res.status(400).json({ error: "donationId is required" });
    }

    const savedRequest = await requestService.addRequest({
      requestedId: req.user.id,
      status: "pending",
      donationId,
      UpdatedBy: req.user.id,
    });

    return res.status(201).json(savedRequest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getRequestsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const requests = await Request.find({ requestedId: userId }).populate({
      path: "donationId",
      select: "category description quantity donor status createdAt",
      populate: { path: "donor", select: "name username" }
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found for this user" });
    }

    return res.json(requests);
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
    const userRole = req.user?.role;
    const { status } = req.body;

    if ([REQUEST_STATUS[1], REQUEST_STATUS[3]].includes(status)) {
      if (userRole !== ROLES[2]) { // ROLES[2] = "admin"
        return res.status(403).json({ error: "Only admins can approve or reject requests" });
      }
    }

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
  getRequestsByUser,
};