const User = require("../models/user.model");



exports.login = async (username, password) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: username });
    if (!user) {
      // Username not found
      return { error: "Invalid username" };
    }
    // For production, use hashed passwords (e.g. with bcrypt.compare)
    if (user.password !== password) {
      // Password does not match
      return { error: "Incorrect password." };
    }
    // Successful login
    return user;
  } catch (error) {
    console.log("Error during login:", error);
    return null;
  }
};
