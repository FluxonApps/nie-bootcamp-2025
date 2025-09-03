const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");

const allRoutes = [...userRoutes, ...postRoutes,];

module.exports = allRoutes;
