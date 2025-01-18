const express =require("express");
const {connectDB} = require("./config/database");
const app=express();
const {User} = require("./models/user");

app.use(express.json());

app.post("/signup", async(req,res)=>{

    //Creating a new instance of the user model-----> in short creating a new user
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User Added Successfully...")
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
})

// Get user by emailId
app.get("/userEmail",async(req,res)=>{
    

    try{
        const users = await User.find({emailId: req.body.emailId})
        if(users.length===0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong:-" + err.message);
    }
    
    
})
//Feed API- Get/feed - get all the users from the database
app.get("/feed", async(req,res)=>{
    

    try{
        const users = await User.find({});
        if(users.length ===0){
            res.status(404).send("Users not fount");
        }else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong...")
    }
})

connectDB()
    .then(()=>{
        console.log("Database connection establised...");
        app.listen(3000,()=>{
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err)=>{
        console.log("Database connection cannot be establised...");
    })

