const donationController = require("../controllers/donationController");
const { authMiddleware } = require("../middleware/authMiddleware");

const base = "/api/donations";

const donationRoutes = [
  {
    method: "GET",
    url: `${base}/my-donations`,
    handler: [authMiddleware, donationController.getMyDonations],
  },
  {
    method: "POST",
    url: base,
    handler: [authMiddleware, donationController.addDonation],
  },
  {
    method: "PUT",
    url: `${base}/:id/fulfilled`,
    handler: [authMiddleware, donationController.markDonationAsFulfilled],
  },
];

module.exports = donationRoutes;
