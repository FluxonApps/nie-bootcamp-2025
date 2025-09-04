require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { APP_PORT, DB_URL } = require("./config/vars");
const routes = require("./routes/main");

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", server: "fintrack server" });
});

// Register routes dynamically
routes.forEach((route) => {
  try {
    app[route.method.toLowerCase()](route.url, route.handler);
  } catch (err) {
    console.warn(`Error creating route ${route.url}:`, err.message);
  }
});

// Start server with DB connection
const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ Database successfully connected");

    app.listen(APP_PORT, () => {
      console.log(`🚀 Server started at port ${APP_PORT}`);
    });
  } catch (err) {
    console.error("❌ Error in starting server:", err.message);
    process.exit(1);
  }
};

start();
