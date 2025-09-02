const userRoutes = require("./userRoute");
const authRoutes = require("./authRoutes");

const allRoutes = [...userRoutes, ...authRoutes];

module.exports = allRoutes;
