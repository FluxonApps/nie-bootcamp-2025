const usersController = require("../controllers/usersController");

const usersRoutes = [
  {
    method: "GET",
    url: "/api/users", // full URL path
    handler: usersController.getAllUsers,
  },
];

module.exports = usersRoutes;