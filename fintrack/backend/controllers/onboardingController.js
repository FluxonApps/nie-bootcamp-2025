const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Optional: generate token if needed

const saveDetails = async (req, res) => {
  try {
    const { name, email, password, college, budget } = req.body;

    if (!name || !college || !budget || !email || !password) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    // Create new user
    const user = await User.create({ name, email, password, college, budget });

    console.log(user);

    // Optional: Generate a JWT token if your frontend expects authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    // Return only required info: userId and token
    res.status(201).json({
      message: "Onboarding completed successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { saveDetails };
