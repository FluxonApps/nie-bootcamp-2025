const userRoutes = require("./userRoute");
const requestRoutes = require("./requestRoute");

const allRoutes = [...userRoutes, ...requestRoutes];

module.exports = allRoutes;
