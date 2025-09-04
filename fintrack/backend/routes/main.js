const userRoutes = require("./userRoute");

const billReminderRoutes = require("./billReminderRoute");


const onboardingRoutes= require("./onboardingRoute");

const allRoutes = [...userRoutes,...onboardingRoutes,...billReminderRoutes];


module.exports = allRoutes;
