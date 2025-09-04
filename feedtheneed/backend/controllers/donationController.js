const donationService = require("../services/donationservice");

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
    res.status(500).json({ error: "Failed to add donation" });
  }
};

// Update donation status (admin or donor can update their own donation)
const updateDonationStatus = async (req, res) => {
  try {
    const donationId = req.params.id;
    const updatedDonation = await donationService.markAsFulfilled(donationId);
    res.json(updatedDonation);
  } catch (err) {
    res.status(500).json({ error: "Failed to update donation status" });
  }
};

module.exports = { 
  getAllDonations, 
  getMyDonations, 
  addDonation, 
  updateDonationStatus 
};


