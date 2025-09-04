const userRoutes = require("./userRoute");
const billReminderRoutes = require("./billReminderRoute");

const allRoutes = [...userRoutes, ...billReminderRoutes];

module.exports = allRoutes;
