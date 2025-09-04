module.exports = {
<<<<<<< HEAD
  APP_PORT: process.env.PORT ? process.env.PORT : "8003",
  DB_URL: process.env.DB_URL ? process.env.DB_URL : "",
=======
  APP_PORT: process.env.APP_PORT || 8003,   
  DB_URL: process.env.DB_URL,               
  SECRET_KEY: process.env.SECRET_KEY,       
>>>>>>> 96449592394042a7ec06d0c38145f04eb2eb4b8a
};
