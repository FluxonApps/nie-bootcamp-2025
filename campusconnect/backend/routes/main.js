const loginRoutes = require("./loginRoutes");
const signUpRoutes = require("./signUpRoutes");
const userRoutes = require("./userRoute");
const postRoutes = require("./postRoute");
const groupRoutes = require("./groupRoute");
const connectionRoutes = require("./connectionRoutes");
const profileRoutes = require("./profileRoutes");
const updateProfileRoutes = require("./updateProfileRoutes");

const allRoutes = [...userRoutes,...groupRoutes,...signUpRoutes,...loginRoutes,...postRoutes,...profileRoutes,...updateProfileRoutes,...connectionRoutes];





module.exports = allRoutes;
