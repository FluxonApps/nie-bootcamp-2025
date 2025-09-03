const User = require("../models/user.model");



exports.signup = async (user) => {
  try {

    const existingUser = await User.findOne({ username: user.username });
    // const existingUser = await User.findOne({ name: user.name });
    if (existingUser) {
      // Throw or return a clear indicator for controller to handle
      return { error: "Username already exists." };
    }
    

    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.log("Error saving new user:", error);
    return null;
  }
};

