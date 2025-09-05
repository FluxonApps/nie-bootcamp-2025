const donationService = require("../services/donationService");
const { ROLES } = require("../constants/constant");
const Donation = require("../models/donationModel"); // to use populate in getDonationById

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    let donations;

    if (req.user.role === ROLES[2]) {
      // Admin can see all donations
      donations = await donationService.getAllDonations();
    } else if (req.user.role === ROLES[0]) {
      // Donor can see only their own donations
      donations = await donationService.getDonationsByDonor(req.user.id);
    } else {
      // Recipients can see all available donations
      donations = await donationService.getAvailableDonations();
    }

    return res.json(donations || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Add new donation (only donor)
const addDonation = async (req, res) => {
  try {
    if (req.user.role !== ROLES[0]) {
      return res.status(403).json({ error: "Only donors can add donations" });
    }

    const { category, description, quantity } = req.body;

    if (!category || !quantity) {
      return res
        .status(400)
        .json({ error: "category and quantity are required" });
    }

    const savedDonation = await donationService.addDonation(
      { category, description, quantity },
      req.user.id // donorId from JWT
    );

    return res.status(201).json(savedDonation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get only the authenticated donor's donations
const getMyDonations = async (req, res) => {
  try {
    const donations = await donationService.getDonationsByDonor(req.user.id);
    return res.json(donations || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get donation by ID (with donor details)
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate({
      path: "donor",
      select: "name username role",
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    return res.json(donation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update donation status (donor or admin)
const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const donationId = req.params.id;

    // Only donors can update their own donation OR admins can update any
    if (req.user.role !== ROLES[0] && req.user.role !== ROLES[2]) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updated = await donationService.updateDonationStatus(
      donationId,
      status,
      req.user.id // UpdatedBy
    );

    if (!updated) {
      return res.status(404).json({ error: "Donation not found" });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete donation (only admin)
const deleteDonation = async (req, res) => {
  try {
    if (req.user.role !== ROLES[2]) {
      return res.status(403).json({ error: "Only admins can delete donations" });
    }

    const deleted = await donationService.deleteDonation(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Donation not found" });
    }

    return res.json({ message: "Donation deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDonations,
  addDonation,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getMyDonations,
};
