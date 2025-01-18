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

app.get("/user",(req,res)=>{
    res.send("user is here")
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

