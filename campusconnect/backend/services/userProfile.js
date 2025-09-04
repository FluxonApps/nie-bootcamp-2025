const User = require("../models/user.model");



exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "name profilePicture location about skills socialLinks education"
    );
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
