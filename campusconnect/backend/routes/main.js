const userRoutes = require("./userRoute");
const groupRoutes = require("./groupRoute");

const allRoutes = [...userRoutes,...groupRoutes];

module.exports = allRoutes;
