const loginController = require("../controllers/loginController.js");

const base = "/api/users/";

const loginRoutes = [
  {
    method: "POST",
    url: base+"login",
    handler: loginController.login,
  },
];

module.exports = loginRoutes;

