const userController = require("../controllers/userController.js");

const base = "/api/users";

const userRoutes = [
  {
    method: "GET",
    url: base, // get all users
    handler: userController.getAllUsers,
  },
  {
    method: "POST",
    url: `${base}/signup`, // signup (donor, recipient, or admin)
    handler: userController.addUser,
  },
  {
    method: "POST",
    url: `${base}/login`, // login route
    handler: userController.loginUser,
  },
];

module.exports = userRoutes;
