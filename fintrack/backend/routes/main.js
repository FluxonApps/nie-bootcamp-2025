const userRoutes = require("./userRoute");
const onboardingRoutes = require("./onboardingRoute");
const transactionRoutes = require("./transactionRoute");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");
const billRemainderRoutes = require("./billReminderRoutes");

const allRoutes = [
  ...userRoutes,
  ...onboardingRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...authRoutes,
  ...billRemainderRoutes,
];


module.exports = allRoutes;
