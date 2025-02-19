const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionsRequest");
const {User} = require("../models/user");
requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params?.toUserId;
        const status = req.params?.status

        const ALLOWED_STATUS = ["interested","ignored"];

        if(!ALLOWED_STATUS.includes(status)){
            throw new Error("Invalid connection request!!")
        }

        const toUser = await User.findById(toUserId);  
        if(!toUser){
            // 
            return res.status(404).json({message: "User not found"})
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId,toUserId: fromUserId}
            ]
            
        })
        if(existingConnectionRequest){
            throw new Error("Connection request already exits")
        }
        // if(fromUserId == toUserId){
        //     throw new Error("Cannot send request to itself!!")
        // }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();
        // console.log(toUser)
        res.json( 
            {
                message: `${req.user.firstName} sent ${status} request to ${toUser.firstName} Successfully !`,
                data
            }
        );
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth , async(req,res)=>{
    try{
        const {status , requestId} = req.params;
        const loggedInUser = req.user;

        const ALLOWED_STATUS =["accepted","rejected"];

        if(!ALLOWED_STATUS.includes(status)){
            throw new Error("Invalid connection request!!");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        })
        if(!connectionRequest){
            throw new Error("connection request not found");
        }
        connectionRequest.status= status;

        const data = await connectionRequest.save();

        res.json({
            message: `connection request is successfully ${status}`,
            data,
        })
    }   
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }    
})

module.exports = requestRouter;