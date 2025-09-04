const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    }
  }
);

module.exports = mongoose.model("Categories", CategorySchema);