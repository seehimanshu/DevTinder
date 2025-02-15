const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");


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

module.exports = profileRouter;