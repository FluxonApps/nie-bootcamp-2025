const donationController = require("../controllers/donationController.js");

const base = "/api/donations";

const donationRoutes = [
  {
    method: "GET",
    url: base, // get all donations
    handler: donationController.getAllDonations,
  },
  {
    method: "POST",
    url: base, // add donation
    handler: donationController.addDonation,
  },
  {
    method: "DELETE",
    url: `${base}/:id`, // delete donation by id
    handler: donationController.deleteDonation,
  },
];

module.exports = donationRoutes;
