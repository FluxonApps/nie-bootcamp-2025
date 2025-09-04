const Donation = require("../models/donationModel");

// Get all donations of a donor
const getDonationsByDonor = async (donorId) => {
  return await Donation.find({ donor: donorId }).sort({ createdAt: -1 });
};

// Add donation (auto-assign donorId)
const addDonation = async (donationData, donorId) => {
  const donation = new Donation({ ...donationData, donor: donorId });
  return await donation.save();
};

// Mark donation as fulfilled
const markAsFulfilled = async (donationId) => {
  return await Donation.findByIdAndUpdate(
    donationId,
    { status: "fulfilled" },
    { new: true }
  );
};

module.exports = { getDonationsByDonor, addDonation, markAsFulfilled };
