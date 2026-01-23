const Donation = require("../models/donationModel");

// Admin: get all donations
const getAllDonations = async () => {
  return await Donation.find().sort({ CreatedAt: -1 });
};

// Donor: get donations by donor handled by dedicated method

// Add donation (donorId comes from auth)
const addDonation = async (donationData, donorId) => {
  const now = new Date();

  const donation = new Donation({
    ...donationData,
    donor: donorId,
    CreatedAt: now,
    UpdatedAt: now,
  });

  return await donation.save();
};

// Get donation by ID
const getDonationById = async (id) => {
  return await Donation.findById(id).populate("donor", "name username email");
};

// Update donation (status or details)
const updateDonation = async (id, updateData, user) => {
  updateData.UpdatedAt = new Date();
  updateData.UpdatedBy = user.id;

  return await Donation.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete donation (only admin should be allowed at controller level)
const deleteDonation = async (id) => {
  return await Donation.findByIdAndDelete(id);
};

// Get donations by donor (sorted latest first)
const getDonationsByDonor = async (donorId) => {
  return await Donation.find({ donor: donorId }).sort({ CreatedAt: -1 });
};

// Recipient: get only available donations (status: active)
const getAvailableDonations = async () => {
  return await Donation.find({ status: 'active' }).sort({ CreatedAt: -1 });
};

module.exports = {
  getAllDonations,
  addDonation,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonationsByDonor,
  getAvailableDonations,
};
