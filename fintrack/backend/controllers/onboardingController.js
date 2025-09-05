const User=require("../models/userModel");
const saveDetails=async(req,res)=>{
  try{
    const{name,email,password,college,budget}=req.body;
    if(!name || !college || !budget){
      return res.status(400).json({message:"Some Fields are missing"})
    }
    
    const user=await User.create({name,email,password,college,budget});

    console.log(user);
    res.status(201).json({
      message:"onboarding completed successfully",user
    })
  }
  catch (error){
    res.status(500).json({message:"server error",error:error.message})
  }
}

module.exports={saveDetails}