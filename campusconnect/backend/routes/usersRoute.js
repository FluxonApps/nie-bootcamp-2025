const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

// GET all users
router.get("/api/users", usersController.getAllUsers);

module.exports = router;
const usersController = require("../controllers/usersController");

const usersRoutes = [
  {
    method: "GET",
    url: "/api/users", // full URL path
    handler: usersController.getAllUsers,
  },
];

module.exports = usersRoutes; // export the array
