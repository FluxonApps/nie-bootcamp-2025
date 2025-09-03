const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // 🔑 Move to .env in production

exports.loginUser = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      // ✅ If user does not exist, create a new one
      user = new User({
        email,
        password,
        onboardingCompleted: false, // start with onboarding incomplete
      });
      await user.save();
    } else {
      // ✅ If user exists, check password
      if (user.password !== password) {
        return { success: false, message: "Invalid credentials" };
      }
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
      },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Server error" };
  }
};
