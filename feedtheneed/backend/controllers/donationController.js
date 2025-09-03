const donationService = require("../services/donationService");

// GET all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    return res.json(donations || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ADD donation
const addDonation = async (req, res) => {
  try {
    const { donor, category, description, status } = req.body;

    if (!donor || !category) {
      return res.status(400).json({ error: "donor and category are required" });
    }

    const savedDonation = await donationService.addDonation({
      donor,
      category,
      description,
      status,
    });

    return res.status(201).json(savedDonation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE donation
const deleteDonation = async (req, res) => {
  try {
    const donationId = req.params.id;
    const deleted = await donationService.deleteDonation(donationId);

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
  deleteDonation,
};
