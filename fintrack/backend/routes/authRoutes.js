const authController = require("../controllers/authController.js");

const base = "/api/auth";

const authRoutes = [
  {
    method: "POST",
    url: `${base}/login`,
    handler: authController.login,
  },
];

module.exports = authRoutes;
