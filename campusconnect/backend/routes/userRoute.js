const userController = require("../controllers/userController.js");

const base = "/api/user";

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
];

module.exports = userRoutes;
