const userRoutes = require("./userRoute");

const onboardingRoutes = require("./onboardingRoute");
const transactionRoutes = require("./transactionRoute");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("./authRoutes");


const allRoutes = [
  ...userRoutes,
  ...onboardingRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...authRoutes,
];


module.exports = allRoutes;
