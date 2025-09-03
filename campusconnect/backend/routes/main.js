const loginRoutes = require("./loginRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoute");
const groupRoutes = require("./groupRoute");

const allRoutes = [...userRoutes,...groupRoutes,...signUpRoutes,...loginRoutes];

module.exports = allRoutes;
