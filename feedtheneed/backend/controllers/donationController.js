const donationService = require("../service/donationService");

// Get all donations (latest first)
const getAllDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    res.json(donations || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get only logged-in donor's donations
const getMyDonations = async (req, res) => {
  try {
    const donorId = req.user.id; // from JWT auth middleware
    const donations = await donationService.getDonationsByDonor(donorId);
    res.json(donations || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new donation (donor auto-assigned from token)
const addDonation = async (req, res) => {
  try {
    const donorId = req.user.id; // take from token
    const { category, description, quantity } = req.body;

    if (!category || !quantity) {
      return res
        .status(400)
        .json({ error: "category and quantity are required" });
    }

    const newDonation = await donationService.addDonation(
      { category, description, quantity },
      donorId
    );

    res.status(201).json(newDonation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update donation status (admin or donor can update their own donation)
const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await donationService.updateDonationStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  getAllDonations, 
  getMyDonations, 
  addDonation, 
  updateDonationStatus 
};


