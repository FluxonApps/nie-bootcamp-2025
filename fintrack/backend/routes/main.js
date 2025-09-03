const userRoutes = require("./userRoute");
const onboardingRoutes= require("./onboardingRoute");

const allRoutes = [...userRoutes,...onboardingRoutes];

module.exports = allRoutes;
