const User = require("../models/user.model");

exports.updateUserById = async (userId, updateFields) => {
  try {
    // Only update fields sent in updateFields object
    const allowedFields = [
      "name",
      "profilePicture",
      "location",
      "about",
      "skills",
      "socialLinks",
      "education",
    ];

    // Filter updateFields to include only allowed fields
    const filteredFields = {};
    allowedFields.forEach((field) => {
      if (updateFields[field] !== undefined) {
        filteredFields[field] = updateFields[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      filteredFields,
      { new: true }
    ).select("-password"); // Exclude password in response

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};