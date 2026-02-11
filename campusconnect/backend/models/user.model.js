const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  bannerImg: { type: String, default: "" },
  headline: { type: String, default: "Connect Campus User" },
  location: { type: String, default: "Earth" },
  about: { type: String, default: "" },
  skills: [String],

  socialLinks: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" }
  },

  education: [
    {
      branchOfStudy: { type: String, default: "" },
      year: { type: Number, }
    }
  ]
},
{ timestamps: true });

module.exports = mongoose.model("Userdetails", userSchema);

