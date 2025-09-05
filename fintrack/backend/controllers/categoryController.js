const Category = require("../models/categoryModel");

// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
