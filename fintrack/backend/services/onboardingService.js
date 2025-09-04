
const User = require("../models/userModel");

exports.completeOnboarding = async (userId, data) => {
  await User.findByIdAndUpdate(userId, { ...data, onboardingCompleted: true });
  return { success: true, message: "Onboarding completed" };
};
