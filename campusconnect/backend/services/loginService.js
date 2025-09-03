const User = require("../models/userModel");

exports.loginUser = async (username,address ) => {
    const user = await User.findOne({username:username});
    if (!user) throw new Error("User not found");
    if (user.address!== address) throw new Error("Invalid password");
    return user;
};