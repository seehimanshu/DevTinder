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

userRouter.get("/user/connections", userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"}
            ]
        })
        .populate("toUserId",USER_SAVE_DATA)
        .populate("fromUserId",USER_SAVE_DATA);

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId.toString() === loggedInUser._id.toString() ){
                return row.toUserId;
            }else{
                return row.fromUserId;
            }
            
        })
        res.json({
            
            data
        })
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

userRouter.get("/user/feed", userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser},
                {toUserId:loggedInUser}
            ]
        }).select("fromUserId toUserId");

        const restrictedUsersFromFeed = new Set();

        connectionRequests.forEach((req)=>{
            restrictedUsersFromFeed.add(req.fromUserId.toString());
            restrictedUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and:[
                {_id: { $nin: Array.from(restrictedUsersFromFeed) } },
                {_id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAVE_DATA)

        res.json({
            message:"All user feed",
            data:users
        })
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})
module.exports = userRouter;