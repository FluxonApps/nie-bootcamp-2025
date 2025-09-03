const Request = require("../models/requestModel");

const getAllRequests = async () => {
  return await Request.find().sort({ CreatedAt: -1 });
};

const addRequest = async (requestData) => {
  const now = new Date();
  requestData.CreatedAt = now;
  requestData.UpdatedAt = now; // 👈 Set to match CreatedAt initially
  const request = new Request(requestData);
  return await request.save();
};


const getRequestById = async (id) => {
  return await Request.findById(id);
};

const updateRequest = async (id, updateData) => {
  if (updateData.status === "approved") {
    updateData.UpdatedAt = new Date();
  }
  return await Request.findByIdAndUpdate({id}, updateData, { new: true });
};

const deleteRequest = async (id) => {
  return await Request.findByIdAndDelete(id);
};

module.exports = {
  getAllRequests,
  addRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
};