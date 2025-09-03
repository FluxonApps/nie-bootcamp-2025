const userRoutes = require("./userRoute");
const loginRoutes = require("./loginRoute");

const allRoutes = [...userRoutes, ...loginRoutes];

module.exports = allRoutes;
