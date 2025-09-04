const loginRoutes = require("./loginRoutes");
const signUpRoutes = require("./signUpRoutes");
const usersRoutes = require("./usersRoute");
const postRoutes = require("./postRoute");
const groupRoutes = require("./groupRoute");
const connectionRoutes = require("./connectionRoutes");

const allRoutes = [...groupRoutes,...signUpRoutes,...loginRoutes,...postRoutes, ...connectionRoutes, ...usersRoutes];


module.exports = allRoutes;
