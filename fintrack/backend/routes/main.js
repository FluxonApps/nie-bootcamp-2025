const userRoutes = require("./userRoute");
const onboardingRoutes= require("./onboardingRoute");
const authRoutes = require("./authRoutes");

const allRoutes = [...userRoutes,...onboardingRoutes,...authRoutes];


module.exports = allRoutes;
