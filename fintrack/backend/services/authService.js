const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/vars");

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return ({
    success: false,
    message: "User not found",
    email,
    password,
  });

    if (user.password !== password) {
      return { success: false, message: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "5d" } // ✅ now 5 days
    );

    return {
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Server error" };
  }
};
