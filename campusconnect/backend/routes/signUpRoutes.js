const signUpController = require("../controllers/signUpController.js");




const base="/api/signup"
const signUpRoutes=[
    {
    method: "POST",
    url:base,
    handler: signUpController.signup,
  }
]





module.exports = signUpRoutes;