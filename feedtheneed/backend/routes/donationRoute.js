const donationController = require("../controllers/donationController.js");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const base = "/api/donations";

const donationRoutes = [
  // Any logged-in user can view all donations (admin sees all, donor sees their own in controller)
  { method: "GET", url: base, handler: [authMiddleware, donationController.getAllDonations] },

  //  Donor can view only their donations
  {
    method: "GET",
    url: `${base}/my`,
    handler: [authMiddleware, authorizeRoles("donor"), donationController.getMyDonations],
  },

  //  Only donor can create a donation
  { method: "POST", url: base, handler: [authMiddleware, authorizeRoles("donor"), donationController.addDonation] },

  //  Donor can update their own donation, admin can update any donation
  {
    method: "PUT",
    url: `${base}/:id`,
    handler: [authMiddleware, donationController.updateDonationStatus],
  },

  // Only admin can delete a donation
  {
    method: "DELETE",
    url: `${base}/:id`,
    handler: [authMiddleware, authorizeRoles("admin"), donationController.deleteDonation],
  },
];

module.exports = donationRoutes;
