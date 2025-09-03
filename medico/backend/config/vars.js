module.exports = {
  APP_PORT: process.env.PORT ? process.env.PORT : "8004",
  DB_URL: process.env.DB_URL ? process.env.DB_URL : "mongodb://localhost:27017/", //local mongo 
};
