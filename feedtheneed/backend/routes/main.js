const userRoutes = require("./userRoute");
const donationRoutes = require("./donationRoute");
const allRoutes = [...userRoutes,...donationRoutes,];

module.exports = allRoutes;
