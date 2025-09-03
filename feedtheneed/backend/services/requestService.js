// services/requestService.js
const Request = require("../models/requestModel");
const { REQUEST_STATUS } = require("../constants/constant");

// Get all requests
const getAllRequests = async () => {
  return await Request.find()
    .populate("recipient")
    .populate("donation");
};

// Add a new request
const addRequest = async (requestData) => {
  const request = new Request(requestData);
  return await request.save();
};

// Find request by ID
const findById = async (id) => {
  return await Request.findById(id)
    .populate("recipient")
    .populate("donation");
};

// Update request status
const updateRequestStatus = async (id, status) => {
  if (!Object.values(REQUEST_STATUS).includes(status)) {
    throw new Error(`Invalid status. Allowed: ${Object.values(REQUEST_STATUS).join(", ")}`);
  }
  return await Request.findByIdAndUpdate(id, { status }, { new: true });
};

// Delete request
const deleteRequest = async (id) => {
  return await Request.findByIdAndDelete(id);
};

module.exports = {
  getAllRequests,
  addRequest,
  findById,
  updateRequestStatus,
  deleteRequest,
};
