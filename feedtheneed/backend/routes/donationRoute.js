const donationController = require("../controllers/donationController.js");
const { DONATION_STATUS } = require("../constants/constant");

const base = "/api/donations";

const donationRoutes = [
  {
    method: "GET",
    url: base,
    handler: donationController.getAllDonations,
  },
  {
    method: "POST",
    url: base,
    handler: donationController.addDonation,
  },
  {
    method: "PATCH",
    url: `${base}/:id/status`,
    handler: donationController.updateDonationStatus,
    
    allowedStatus: Object.values(DONATION_STATUS),
  },
];

module.exports = donationRoutes;
