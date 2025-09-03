const loginRoutes = require("./loginRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoute");

const allRoutes = [...userRoutes,...signUpRoutes,...loginRoutes];

module.exports = allRoutes;
