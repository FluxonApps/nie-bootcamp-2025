const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: String,
  adulterants: [
    {
      name: String,
      healthImpact: String,
    },
  ],
  quantity: String,
});

const concernSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  severity: {
    type: String,
    default: "Low",
  },
});


const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  aliases: [String],
  brand: String,
  description: String,
  category: String,

  ingredients: [ingredientSchema],
  concernSchemas: [concernSchema],
  useCases: [String],


  features: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String,
    vitamins: [String],
    minerals: [String],
    otherBenefits: [String],
  },
  aiSuggestion: {
      reviewer: {
        type: String,
      riskScore: {
        type: Number,
        min: 0,
        max: 100,
      }
    }
  },
  aiDescription: String,
  isApproved: { type: Boolean, default: false },
  verdict: { type: String, default: "Unknown" },
});


module.exports = mongoose.model("Product", productSchema);
