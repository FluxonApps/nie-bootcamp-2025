const loginController = require("../controllers/loginController.js");




const base="/api/login"
const loginRoutes=[
    {
    method: "GET",
    url:base,
    handler: loginController.login,
  }
]





module.exports = loginRoutes;