const loginRoutes = require("./loginRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoute");
const groupRoutes = require("./groupRoute");
const connectionRoutes = require("./connectionRoutes");

const allRoutes = [
  ...userRoutes,
  ...groupRoutes,
  ...signUpRoutes,
  ...loginRoutes,
  ...connectionRoutes,
];

module.exports = allRoutes;
