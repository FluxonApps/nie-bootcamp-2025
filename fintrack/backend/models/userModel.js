const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  college:{type:String, required:true},
  budget:{type:Number, required:true},
  onboardingCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userModel);