const userRoutes = require("./userRoute");
const onboardingRoutes= require("./onboardingRoute");
const transactionRoutes = require("./transactionRoute");

const allRoutes = [...userRoutes,...onboardingRoutes,...transactionRoutes];

module.exports = allRoutes;
