const profileService = require("../services/userProfile");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await profileService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
