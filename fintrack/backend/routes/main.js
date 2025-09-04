const userRoutes = require("./userRoute");
const onboardingRoutes = require("./onboardingRoute");
const transactionRoutes = require("./transactionRoute");
const categoryRoutes = require("./categoryRoutes");

const allRoutes = [
  ...userRoutes,
  ...onboardingRoutes,
  ...transactionRoutes,
  ...categoryRoutes
];

module.exports = allRoutes;
