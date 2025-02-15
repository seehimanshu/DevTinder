const express = require("express");
const authRouter = express.Router();
const {validateSignUpData}= require("../utils/validation");
const bcrypt = require("bcrypt");
const {User} = require("../models/user");


authRouter.post("/signup", async(req,res)=>{
    validateSignUpData(req);
    //Creating a new instance of the user model-----> in short creating a new user
    const{firstName , lastName , emailId , password}= req.body;

    const passwordHash = await  bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });
    
    try{
        await user.save();
        
        if(req.body?.skills.length>10){
            throw new Error("Skills cannot be more than 10")
        }else{
            res.send("User Added Successfully...")
        }
        
    }
    catch(err){
        res.status(400).send("Error:" + err.message);
    }
    
})
authRouter.post("/login",async(req,res)=>{
    try{
        const{emailId ,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        // console.log(user);
        if(!user){
            throw new Error("Credential is not valid");
        }
        const isPasswordValid =await user.validatePassWord(password);
        
        if(!isPasswordValid){     
            throw new Error("Credential is not valid");
        }
        else{
            const token = await user.getJWT();            
            res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
            res.send("Login successfully");
        }
    }
    catch(err){
        res.status(404).send("Error: " + err.message);
    }
})

module.exports = authRouter;