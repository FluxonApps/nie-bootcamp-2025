const profileController = require("../controllers/profileController");

const base = "/api/users";

const profileRoutes = [
  {
    method: "GET",
    url: `${base}/:id`,
    handler: profileController.getUserProfile,
  },
];

module.exports = profileRoutes;