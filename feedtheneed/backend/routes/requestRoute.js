const requestController = require("../controllers/requestController.js");

const base = "/api/requests";

const requestRoutes = [
  { method: "GET", url: base, handler: requestController.getAllRequests },
  { method: "POST", url: base, handler: requestController.addRequest },
  { method: "GET", url: `${base}/:id`, handler: requestController.getRequestById },
  { method: "PUT", url: `${base}/:id`, handler: requestController.updateRequest },
  { method: "DELETE", url: `${base}/:id`, handler: requestController.deleteRequest },
];

module.exports = requestRoutes;