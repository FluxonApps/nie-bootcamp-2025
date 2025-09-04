const User = require("../models/userModel");

const saveDetails = async (req, res) => {
  try {
    const { name, college, budget, email, password } = req.body;

    // Validate input
    if (!name || !college || !budget || !email || !password) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      college,
      budget,
      email,
      password,
    });

    res.status(201).json({
      message: "Onboarding completed successfully",
      user,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { saveDetails };
