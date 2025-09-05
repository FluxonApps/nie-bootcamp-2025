const userRoutes = require("./userRoute");
const onboardingRoutes= require("./onboardingRoute");
const authRoutes = require("./authRoutes");
const billReminderRoutes = require("./billReminderRoutes");

const allRoutes = [...userRoutes, ...onboardingRoutes, ...authRoutes, ...billReminderRoutes];


module.exports = allRoutes;
