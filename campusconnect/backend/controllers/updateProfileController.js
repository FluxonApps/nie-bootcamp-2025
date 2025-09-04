const updateProfileService= require("../services/updateProfile");

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = req.body;

    // Prevent username update by removing it if present
    if (updateFields.username) delete updateFields.username;

    const updatedUser = await updateProfileService.updateUserById(userId, updateFields);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or update failed" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
