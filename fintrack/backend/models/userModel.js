const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name:{type:String, required:false},
  email:{type:String,required:true},
  password:{type:String,required:true},
  college:{type:String, required:false},
  budget:{type:Number, required:false},
  onboardingCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userModel);