const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/favorites", authMiddleware, authController.addFavorite);
router.get("/favorites", authMiddleware, authController.getFavorites);

module.exports = router;
