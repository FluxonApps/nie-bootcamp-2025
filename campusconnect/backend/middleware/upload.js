const multer = require("multer");
const path = require("path");

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({ storage });

module.exports = upload; // ✅ export the multer instance
