const express=require("express")
const router=express.Router();
const {saveDetails}=require("../controllers/onboardingController");

router.post("/",saveDetails);

module.exports=router;