const express = require("express");
const userRouter = express.Router();
const {userAuth} =require("../middlewares/auth");
const {User} =require("../models/user");
const ConnectionRequest = require("../models/connectionsRequest");
const USER_SAVE_DATA =  "firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests/received", userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",USER_SAVE_DATA);
        //populate("fromUserId",["firstName","lastName"])
        //.populate("fromUserId, "firstName lastName skills age gender about photoUrl") -->> both ways are correct;
        const data=connectionRequests.map((row)=>{
            return row.fromUserId
        })
        res.json({
            message: "Data send successfully",
            data
        })
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }

})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id, status:"accepted"},
            {toUserId:loggedInUser._id, status:"accepted"}
        ]
    }).populate("fromUserId",USER_SAVE_DATA).populate("toUserId",USER_SAVE_DATA)

    const data = connectionRequests.map((row)=>{
        if(row.fromUserId.toString() === loggedInUser._id.toString() ){
            return row.toUserId;
        }
        return row.fromUserId;
    })
})
module.exports = userRouter;