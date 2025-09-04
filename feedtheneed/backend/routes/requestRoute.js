const requestController = require("../controllers/requestController.js");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const base = "/api/requests";

const requestRoutes = [
  // ✅ Any logged-in user can view requests (but what they see depends on role in controller)
  { method: "GET", url: base, handler: [authMiddleware, requestController.getAllRequests] },

  // ✅ Recipient can view all their own requests
  {
  method: "GET",
  url: `${base}/user/:userId`,
  handler: [authMiddleware, authorizeRoles("recipient"), requestController.getRequestsByUser],
  },

  // ✅ Only recipient can create a request
  { method: "POST", url: base, handler: [authMiddleware, authorizeRoles("recipient"), requestController.addRequest] },

  // ✅ Recipient can view their own request, admin can view any
  { method: "GET", url: `${base}/:id`, handler: [authMiddleware, requestController.getRequestById] },

  // ✅ Only admin can approve/reject requests
  { method: "PUT", url: `${base}/:id`, handler: [authMiddleware, authorizeRoles("admin"), requestController.updateRequest] },

  // ✅ Only admin can delete a request
  { method: "DELETE", url: `${base}/:id`, handler: [authMiddleware, authorizeRoles("admin"), requestController.deleteRequest] },
];

module.exports = requestRoutes;