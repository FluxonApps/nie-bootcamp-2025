const userController = require("../controllers/userController.js");

const base = "/api/users";

const userRoutes = [
  {
    method: "GET",
    url: base,
    handler: userController.getAllUsers,
  },
  {
    method: "POST",
    url: base,
    handler: userController.addUser,
  },
  // New route for getting user budget
  {
    method: "GET",
    url: `${base}/:userId/budget`,
    handler: userController.getUserBudget,
  },
];

module.exports = userRoutes;
