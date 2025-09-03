const requestController = require("../controllers/requestController.js");

const base = "/api/requests";

const requestRoutes = [
  {
    method: "GET",
    url: base, // Get all requests
    handler: requestController.getAllRequests,
  },
  {
    method: "POST",
    url: base, // Add a new request
    handler: requestController.addRequest,
  },
  {
    method: "GET",
    url: `${base}/:id`, // Get a request by ID
    handler: requestController.getRequestById,
  },
  {
    method: "PUT",
    url: `${base}/:id/status`, // Update request status
    handler: requestController.updateRequestStatus,
  },
  {
    method: "DELETE",
    url: `${base}/:id`, // Delete a request
    handler: requestController.deleteRequest,
  },
];

module.exports = requestRoutes;
