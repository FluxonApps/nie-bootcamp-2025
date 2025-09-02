const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // 🔑 Move this to .env in production

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found. Please sign up." };
    }

    if (user.password !== password) {
      return { success: false, message: "Invalid credentials" };
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } // token valid for 1 hour
    );

    return {
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, email: user.email },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Server error" };
  }
};
