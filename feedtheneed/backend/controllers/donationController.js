const donationService = require("../services/donationService");

const getAllDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    res.json(donations || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDonation = async (req, res) => {
  try {
    const { donor, category, description, quantity } = req.body;

    if (!donor || !category || !quantity) {
      return res
        .status(400)
        .json({ error: "donor, category, and quantity are required" });
    }

    const newDonation = await donationService.addDonation({
      donor,
      category,
      description,
      quantity,
    });

    res.status(201).json(newDonation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

module.exports = { getAllDonations, addDonation, updateDonationStatus };

