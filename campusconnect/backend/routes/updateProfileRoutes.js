const updateprofileController = require("../controllers/updateProfileController");

const base = "/api/users";

const updateProfileRoutes = [
  {
    method: "PUT",
    url: `${base}/:id`,
    handler: updateprofileController.updateUserProfile,
  },
  // You can keep your GET route here as well

  {
    method: "GET",
    url: `${base}/:id`,
    handler: updateprofileController.updateUserProfile,
  },
];

module.exports = updateProfileRoutes;