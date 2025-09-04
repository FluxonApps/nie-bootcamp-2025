const connectionController = require("../controllers/connectionController");

const base = "/api/connections";

const connectionRoutes = [
  {
    method: "POST",
    url: `${base}/request`,
    handler: connectionController.sendRequest,
  },
  {
    method: "POST",
    url: `${base}/accept`,
    handler: connectionController.acceptRequest,
  },
  {
    method: "POST",
    url: `${base}/reject`,
    handler: connectionController.rejectRequest,
  },
  {
    method: "GET",
    url: `${base}/:userId`,
    handler: connectionController.getConnections,
  },
  {
    method: "GET",
    url: `${base}/:userId/requests`,
    handler: connectionController.getRequests,
  },
];

module.exports = connectionRoutes;
