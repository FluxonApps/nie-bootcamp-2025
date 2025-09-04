const Donation = require("../models/donationModel");
const { DONATION_STATUS } = require("../constants/constant");

// Get all donations
const getAllDonations = async () => {
  return await Donation.find().populate("donor", "name username");
};

// Add donation
const addDonation = async (donationData) => {
  const donation = new Donation({
    ...donationData,
    status: DONATION_STATUS.ACTIVE, 
  });
  return await donation.save();
};

// Update donation status
const updateDonationStatus = async (donationId, status) => {
  return await Donation.findByIdAndUpdate(
    donationId,
    { status },
    { new: true }
  );
};

const markAsFulfilled = async (donationId) => {
  return await Donation.findByIdAndUpdate(
    donationId,
    { status: DONATION_STATUS.FULFILLED },
    { new: true }
  );
};

module.exports = {
  getAllDonations,
  addDonation,
  updateDonationStatus,
  markAsFulfilled,
};
