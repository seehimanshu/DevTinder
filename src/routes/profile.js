const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileUpdateData} = require("../utils/validation");

profileRouter.get("/profile" ,userAuth , async(req,res)=>{
    const user = req.user;
    try{
        if(!user){
            throw new Error("user is not valid");
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
    
})

profileRouter.patch("/profile/edit" , userAuth, async(req,res)=>{
    try{
        
        if(!validateProfileUpdateData(req)){
            throw new Error("Invalid profile update request");
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);
        
        Object.keys(req.body).every((key)=> loggedInUser[key]=req.body[key]);
    }
    catch(err){
        res.status(400).send("Something went wrong:-" + err.message);
    }
})

module.exports = profileRouter;