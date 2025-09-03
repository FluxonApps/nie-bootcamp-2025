const Request = require("../models/requestModel");

const getAllRequests = async () => {
  return await Request.find();
};

const addRequest = async (requestData) => {
  const request = new Request(requestData);
  return await request.save();
};

const findById = async (id) => {
  return await Request.findById(id);
};

const getRequestById = async (id) => {
  return await Request.findById(id);
};

const updateRequest = async (id, updateData) => {
  return await Request.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteRequest = async (id) => {
  return await Request.findByIdAndDelete(id);
};

module.exports = { getAllRequests, addRequest, findById, getRequestById , updateRequest , deleteRequest };