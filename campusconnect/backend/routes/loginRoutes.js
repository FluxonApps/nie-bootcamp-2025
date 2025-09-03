const loginController = require("../controllers/loginControllers");




const base="/api/login"
const loginRoutes=[
    {
    method: "POST",
    url:base,
    handler: loginController.login,
  }
]





module.exports = loginRoutes;