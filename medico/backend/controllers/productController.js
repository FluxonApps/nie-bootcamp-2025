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
    console.log("Fetching approved products");
    const products = await Product.find({ isApproved: true });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getUnApprovedProducts = async (req, res) => {
  try {
    console.log("Fetching approved products");
    const products = await Product.find({ isApproved: false });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.searchAprovedProducts = async (req, res) => {
  try {
    let { query } = req.query;

    if (!query || query.trim() === "") {
      return res.json({ success: true, data: [] });
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

    const uniqueProducts = Array.from(new Map(products.map(p => [p._id.toString(), p])).values());

    res.json({ success: true, data: uniqueProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getProducts = async (req, res) => {
  try {
    console.log("Fetching all products");
    const products = await Product.find();
    res.json({ success: true, data: products });
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


exports.updateProduct = async (req, res) => {
  try {
    const { name, category, ingredients, approved } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, ingredients, approved },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
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
