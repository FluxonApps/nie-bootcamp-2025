const userRoutes = require("./userRoute");
const donationRoutes = require("./donationRoute");
const requestRoutes = require("./requestRoute");
const allRoutes = [...userRoutes, ...donationRoutes, ...requestRoutes,];

module.exports = allRoutes;
