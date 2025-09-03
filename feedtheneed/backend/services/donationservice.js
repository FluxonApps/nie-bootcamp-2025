const Donation = require("../models/donationModel");

// Get all donations
const getAllDonations = async () => {
  return await Donation.find().populate("donor", "name username role");
};

// Add a new donation
const addDonation = async (donationData) => {
  const donation = new Donation(donationData);
  return await donation.save();
};

// Delete a donation by ID
const deleteDonation = async (id) => {
  return await Donation.findByIdAndDelete(id);
};

module.exports = { getAllDonations, addDonation, deleteDonation };
