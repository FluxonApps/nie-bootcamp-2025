const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoute");

const allRoutes = [...userRoutes,...signUpRoutes];

module.exports = allRoutes;
