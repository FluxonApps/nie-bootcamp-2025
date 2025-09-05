const Product = require("../models/ProductModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, aliases, brand, description, useCases, features, verdict, category, ingredients } = req.body;

    const product = new Product({
      name,
      aliases,
      brand,
      description,
      useCases,
      features,
      verdict,
      category,
      ingredients,
      approved: false, 
    });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getUnApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.searchApprovedProducts = async (req, res) => {
  try {
    let { query } = req.query;

    // If query is empty, return all approved products
    if (!query || query.trim() === "") {
      const products = await Product.find({ isApproved: true });
      return res.json({ success: true, data: products });
    }

    const terms = query.split(",").map(term => term.trim()).filter(Boolean);

    const orConditions = [];
    terms.forEach(term => {
      const regex = new RegExp(term, "i");
      orConditions.push({ name: regex });
      orConditions.push({ category: regex });
      orConditions.push({ aliases: regex });
      orConditions.push({ brand: regex });
      orConditions.push({ description: regex });
      orConditions.push({ useCases: regex });
      orConditions.push({ "ingredients.name": regex });
      orConditions.push({ "features.key": regex });
      orConditions.push({ "features.value": regex });
      orConditions.push({ verdict: regex });
    });

    const products = await Product.find({
      isApproved: true,
      $or: orConditions,
    });

    const uniqueProducts = Array.from(
      new Map(products.map(p => [p._id.toString(), p])).values()
    );

    res.json({ success: true, data: uniqueProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.approved = true;
    await product.save();

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProductReview = async (req, res) => {
  try {
    const { verdict, isApproved } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.verdict = verdict;
    product.isApproved = isApproved;
    await product.save();

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


