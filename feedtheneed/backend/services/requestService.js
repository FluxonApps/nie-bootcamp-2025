const Request = require("../models/requestModel");
const Donation = require("../models/donationModel"); // import donation model
const { REQUEST_STATUS } = require("../constants/constant");

const getAllRequests = async (user) => {
  if (user.role === "recipient") {
    // return only their own requests
    return await Request.find({ requestedId: user.id }).sort({ CreatedAt: -1 });
  } else if (user.role === "admin") {
    // return all requests
    return await Request.find().sort({ CreatedAt: -1 });
  }
  return [];
};
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const addRequest = async (requestData) => {
  // Prevent multiple requests on the same donation
  if (requestData.donationId) {
    const existingRequest = await Request.findOne({
      donationId: requestData.donationId,
      status: { $in: ["pending", "approved"] },
    });

    if (existingRequest) {
      throw new Error("This donation is already requested or approved.");
    }
  }

  const now = new Date();
  requestData.CreatedAt = now;
  requestData.UpdatedAt = now;

  const request = new Request(requestData);
  return await request.save();
};



const getRequestById = async (id) => {
  return await Request.findById(id);
};


const updateRequest = async (id, updateData) => {
  if (updateData.status === "approved") {
    updateData.UpdatedAt = new Date();

    // Mark donation as unavailable
    const request = await Request.findById(id);
    if (request && request.donationId) {
      await Donation.findByIdAndUpdate(request.donationId, { isAvailable: false });
    }
  }

  return await Request.findByIdAndUpdate(id, updateData, { new: true });
};


const deleteRequest = async (id) => {
  return await Request.findByIdAndDelete(id);
};

const getRequestsByUser = async (userId) => {
  return await Request.find({ requestedId: userId }).sort({ CreatedAt: -1 });
};

module.exports = {
  getAllRequests,
  addRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequestsByUser,
};