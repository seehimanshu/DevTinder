const jwt = require("jsonwebtoken");
const {User} = require("../models/user")
const userAuth = async (req , res ,next )=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        const decodeObj = await jwt.verify(token,"$DevTinder@2812");
        const{_id} =decodeObj;
        
        const user = await User.findById({_id});
        if(!user){
            throw new Error("user is not valid");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
    
}

module.exports ={
    userAuth,
}