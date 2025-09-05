const Product = require("../models/ProductModel");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.createProduct = async (req, res) => {
  try {
    const { name, aliases, brand, description, useCases, features, verdict, category, ingredients } = req.body;

    // Build structured product info for AI
    const productInfo = `
    Product Name: ${name}
    Brand: ${brand || "N/A"}
    Aliases: ${aliases?.join(", ") || "N/A"}
    Category: ${category || "N/A"}
    Description: ${description || "N/A"}

    Use Cases: ${useCases?.join(", ") || "N/A"}

    Features:
      Calories: ${features?.calories || "N/A"}
      Protein: ${features?.protein || "N/A"}
      Carbs: ${features?.carbs || "N/A"}
      Fat: ${features?.fat || "N/A"}
      Vitamins: ${features?.vitamins?.join(", ") || "N/A"}
      Minerals: ${features?.minerals?.join(", ") || "N/A"}
      Other Benefits: ${features?.otherBenefits?.join(", ") || "N/A"}

    Ingredients:
    ${ingredients?.map(ing => 
      `- ${ing.name} (${ing.type || "N/A"}), Qty: ${ing.quantity || "N/A"}
        Desc: ${ing.description || "N/A"}
        Adulterants: ${ing.adulterants?.map(ad => `${ad.name} (Impact: ${ad.healthImpact})`).join(", ") || "None"}`
    ).join("\n")}
    `;

    // 1️⃣ Get AI Reviewer Suggestion
    const reviewerResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }, 
      messages: [
        {
          role: "system",
          content:
            "You are an AI product analyzer and reviewer's assistant. Always output valid JSON ONLY with { reviewer: string, riskScore: number }. where give breif suggestion for the reviewer about the product so that they can analize the product come up with to approve the product or not"
        },
        {
          role: "user",
          content: productInfo,
        }
      ]
    });
    const aiReviewer = JSON.parse(reviewerResponse.choices[0].message.content);
    // 2️⃣ Get AI User-Friendly Description
    const descResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Write a simple, engaging 4-line product description for users."
        },
        {
          role: "user",
          content: productInfo,
        },
      ],
      temperature: 0.8,
    });
    const aiDescription = descResponse.choices[0].message.content;

    // 3️⃣ Get Concerns (new step)
      const concernResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a safety auditor. Always output valid JSON object { concerns: [ { type, description, severity } ] }."
        },
        {
          role: "user",
          content: `Identify concerns for this product:\n${productInfo}`
        }
      ]
    });
    let concerns = [];
    try {
      const parsed = JSON.parse(concernResponse.choices[0].message.content);

      // normalize in case AI outputs { concerns: [...] } instead of [...]
      if (Array.isArray(parsed)) {
        concerns = parsed;
      } else if (parsed.concerns && Array.isArray(parsed.concerns)) {
        concerns = parsed.concerns;
      } else {
        concerns = [{ type: "General", description: "AI gave unexpected format", severity: "Low" }];
      }
    } catch (err) {
      console.error("Parse error:", err.message);
      concerns = [{ type: "General", description: "AI could not generate concerns", severity: "Low" }];
    }

    // 4️⃣ Save product
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
      concernSchemas: concerns, // ✅ added concerns here
      aiSuggestion: aiReviewer,
      aiDescription,
      isApproved: false,
    });

    await product.save();
    res.status(201).json({ success: true, data: product });

  } catch (error) {
    console.error("Error creating product:", error);
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
    if (!query || query.trim() === "") {
      const products = await Product.find({ isApproved: true });
      return res.json({ success: true, data: products });
    }

    // Split by comma and space, filter out empty terms
    const terms = query
      .split(/[\s,]+/)
      .map(term => term.trim())
      .filter(Boolean);

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

exports.getSimilarProducts = async (req, res) => {
  try {
    // 1. Find the product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 2. Build the product info string for the AI (reusing logic from createProduct)
    const productInfo = `
      Product Name: ${product.name}
      Brand: ${product.brand || "N/A"}
      Aliases: ${product.aliases?.join(", ") || "N/A"}
      Category: ${product.category || "N/A"}
      Description: ${product.description || "N/A"}
      Use Cases: ${product.useCases?.join(", ") || "N/A"}
      Features:
        Calories: ${product.features?.calories || "N/A"}
        Protein: ${product.features?.protein || "N/A"}
        Carbs: ${product.features?.carbs || "N/A"}
        Fat: ${product.features?.fat || "N/A"}
        Vitamins: ${product.features?.vitamins?.join(", ") || "N/A"}
        Minerals: ${product.features?.minerals?.join(", ") || "N/A"}
        Other Benefits: ${product.features?.otherBenefits?.join(", ") || "N/A"}
      Ingredients:
      ${product.ingredients?.map(ing => 
        `- ${ing.name} (${ing.type || "N/A"}), Qty: ${ing.quantity || "N/A"}`
      ).join("\n")}
    `;

    // 3. Call OpenAI to get similar product names
    const similarProductsResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a product recommendation engine. Based on the product details provided, suggest 5-10 similar or alternative product names. Output a valid JSON object ONLY with a single key 'similarProducts' which is an array of strings. Example: { \"similarProducts\": [\"Product A\", \"Product B\"] }"
        },
        {
          role: "user",
          content: `Analyze this product and suggest similar ones make the product name you suggest would be minimal and common and generalized:\n${productInfo}`
        }
      ]
    });

    // 4. Parse the response and send it
    let similarProducts = [];
    try {
        const parsedResponse = JSON.parse(similarProductsResponse.choices[0].message.content);
        if (parsedResponse.similarProducts && Array.isArray(parsedResponse.similarProducts)) {
            similarProducts = parsedResponse.similarProducts;
        }
    } catch (err) {
        console.error("AI response parse error:", err.message);
        // If parsing fails, we return an error as the operation was unsuccessful
        return res.status(500).json({ success: false, message: "Failed to parse AI response for similar products." });
    }
    
    res.json({ success: true, data: similarProducts });

  } catch (error) {
    console.error("Error getting similar products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
