const userRoutes = require("./userRoute");
const requestRoutes = require("./requestRoute");
const donationRoutes = require("./donationRoute");

const allRoutes = [...userRoutes,...donationRoutes, ...requestRoutes];

module.exports = allRoutes;
